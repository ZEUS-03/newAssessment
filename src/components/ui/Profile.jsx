import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Grid2 as Grid,
} from "@mui/material";
import CustomInput from "./CustomInput";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { validateEmail } from "../../helper/utils";
import { updateUserAction } from "../../redux/authActions";
import CustomDatepicker from "./CustomDatepicker";
import { generateAvatar } from "../../helper/apiCallouts";

import Navbar from "./Navbar";
const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(userData.email);
  const [fname, setFname] = useState(userData.fname);
  const [lname, setLname] = useState(userData.lname);
  const [dob, setDob] = useState(userData.dob);
  const [error, setError] = useState({
    email: "",
    fname: "",
    lname: "",
    dob: "",
  });

  useEffect(() => {
    async function getAvatar() {
      const data = await generateAvatar(userData.fname, userData.lname);
      setAvatar(data);
    }
    getAvatar();
  }, []);

  // State to manage user data and edit mode
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle save changes (in this case, just toggle back to view mode)
  const handleSave = () => {
    const emailError = !validateEmail(email)
      ? "Please enter a valid email."
      : "";
    const dobError = !dob ? "Please enter your DOB." : "";
    const fnameError = !fname ? "Please enter your first name." : "";
    const lnameError = !lname ? "Please enter your last name." : "";

    setError({
      email: emailError,
      dob: dobError,
      fname: fnameError,
      lname: lnameError,
    });
    if (emailError || dobError || fnameError || lnameError) {
      return false;
    }
    dispatch(
      updateUserAction(
        {
          email: email,
          fname: fname,
          lname: lname,
          dob: dob,
        },
        userData.id
      )
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              alt={userData.fname}
              src={avatar}
              sx={{
                width: 75,
                height: 75,
                marginBottom: 2,
                border: "3px solid #fff",
                margin: "auto",
              }}
            />
            {isEditing ? (
              // If in edit mode, show input fields
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <CustomInput
                    label="First Name"
                    type="text"
                    placeholder="Enter your First Name"
                    onChange={(e) => setFname(e.target.value)}
                    value={fname}
                    error={Boolean(error.fname)}
                    helperText={error.fname}
                  />
                </Grid>
                <Grid item>
                  <CustomInput
                    label="Last Name"
                    type="text"
                    placeholder="Enter your Last Name"
                    onChange={(e) => setLname(e.target.value)}
                    value={lname}
                    error={Boolean(error.lname)}
                    helperText={error.lname}
                  />
                </Grid>
                <Grid item>
                  <CustomInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={Boolean(error.email)}
                    helperText={error.email}
                  />
                </Grid>
                <Grid item>
                  <CustomDatepicker
                    value={dob}
                    onChange={(newValue) => setDob(newValue)}
                    error={Boolean(error.dob)}
                    helperText={error.dob}
                  />
                </Grid>
              </Grid>
            ) : (
              // Showing info if not in edit mdoe
              <>
                <Typography variant="h5" gutterBottom>
                  {userData.fname + " " + userData.lname}
                </Typography>
                <div className="flex items-center justify-center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    Email:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {userData.email}
                  </Typography>
                </div>
                <div className="flex items-center justify-center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    DOB:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {userData.dob}
                  </Typography>
                </div>
              </>
            )}

            <Box sx={{ marginTop: 2 }}>
              {isEditing ? (
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={toggleEditMode}
                  fullWidth
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Profile;
