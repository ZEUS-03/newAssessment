import CustomContainer from "./CustomContainer";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomDatepicker from "./CustomDatepicker";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helper/utils";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../redux/authActions";

const Signup = () => {
  const { isLoggedIn } = useSelector((state) => state);

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(null);
  const dispatch = useDispatch();

  const [error, setError] = useState({
    email: "",
    fname: "",
    lname: "",
    password: "",
    dob: "",
  });

  const handleSubmit = () => {
    const emailError = !validateEmail(email)
      ? "Please enter a valid email."
      : "";
    const passwordError = !validatePassword(password)
      ? "Password must be at least 8 chars."
      : "";
    const dobError = !dob ? "Please enter your DOB." : "";
    const fnameError = !fname ? "Please enter your first name." : "";
    const lnameError = !lname ? "Please enter your last name." : "";

    setError({
      email: emailError,
      password: passwordError,
      dob: dobError,
      fname: fnameError,
      lname: lnameError,
    });
    if (emailError || passwordError || dobError || fnameError || lnameError) {
      return false;
    }
    dispatch(
      signupAction({
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        dob: dob,
      })
    );
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <CustomContainer
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className={`align-center text-2xl mb-5 font-semibold`}>Sign up</h2>

        <CustomInput
          label="First Name"
          type="text"
          placeholder="Enter your First Name"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
          error={Boolean(error.fname)}
          helperText={error.fname}
        />

        <CustomInput
          label="Last Name"
          type="text"
          placeholder="Enter your Last Name"
          onChange={(e) => setLname(e.target.value)}
          value={lname}
          error={Boolean(error.lname)}
          helperText={error.lname}
        />

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
        <CustomDatepicker
          value={dob}
          onChange={(newValue) => setDob(newValue)}
          error={Boolean(error.dob)}
          helperText={error.dob}
        />
        <div className="mt-3">
          <CustomButton className="mt-" onClick={handleSubmit}>
            Create your account!
          </CustomButton>
        </div>
        <p className="mt-5">
          or <Link to={"/login"}>Login instead?</Link>
        </p>
      </CustomContainer>
    </div>
  );
};

export default Signup;
