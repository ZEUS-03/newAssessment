import CustomContainer from "./CustomContainer";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helper/utils";
import { validateUser } from "../../helper/apiCallouts";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/authActions";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [userValidated, setUserValidated] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const emailError = !validateEmail(email)
      ? "Please enter a valid email."
      : "";
    const passwordError = !validatePassword(password)
      ? "Password must be at least 8 chars."
      : "";
    setError({
      email: emailError,
      password: passwordError,
    });
    if (emailError || passwordError) {
      return false;
    }
    const validatedUser = await validateUser({ email, password });
    if (!validatedUser) {
      setUserValidated(false);
      return false;
    } else {
      setUserValidated(true);
      dispatch(loginAction(validatedUser));
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <CustomContainer
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className={`align-center text-2xl mb-5 font-semibold`}>Login</h2>
        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={Boolean(error.email)}
          helperText={error.email}
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={Boolean(error.password)}
          helperText={error.password}
        />

        {!userValidated && (
          <p className="text-red-500 mb-3">Email or Password is incorrect.</p>
        )}
        <CustomButton onClick={handleSubmit}>Login</CustomButton>

        <p className="mt-5">
          or <Link to={"/signup"}>create a new account!</Link>
        </p>
      </CustomContainer>
    </div>
  );
};

export default LoginForm;
