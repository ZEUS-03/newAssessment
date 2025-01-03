import CustomContainer from "./CustomContainer";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helper/utils";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    const emailError = !validateEmail(name)
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
          onChange={(e) => setName(e.target.value)}
          value={name}
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
        <CustomButton onClick={handleSubmit}>Login</CustomButton>

        <p className="mt-5">
          or <Link to={"/signup"}>create a new account!</Link>
        </p>
      </CustomContainer>
    </div>
  );
};

export default LoginForm;
