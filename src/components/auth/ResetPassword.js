import {
  LockResetOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import DataContext from "../../context/DataContext";

const ResetPassword = () => {
  const {
    emailId,
    setEmailId,
    password,
    setPassword,
    showPassword,
    confirmPassword,
    showConfirmPassword,
    setConfirmPassword,
    emailIdError,
    passwordError,
    confirmPasswordError,
    handleToggleVisibility,
    handleConfirmVisibility,
    alertMessage,
    alertSeverity,
    showAlert,
    setShowAlert,
    handleResetPassword,
  } = useContext(DataContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <>
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "85vh" }}>
      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Paper
        elevation={10}
        sx={{
          padding: isXs ? 2 : isSm ? 3 : isMd ? 4 : isLg ? 5 : 6,
          width: isXs ? 280 : isSm ? 320 : isMd ? 400 : isLg ? 450 : isXl ? 500 : 450,
          margin: "20px auto",
        }}
      >
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <LockResetOutlined />
          </Avatar>
          <Typography
            variant="h4"
            gutterBottom
            style={{ display: "block", marginTop: 20, marginBottom: 20 }}
          >
            Reset Password
          </Typography>
        </Grid>
        <TextField
          variant="outlined"
          sx={{ mt: 2, mb: 2 }}
          label="Email Id"
          placeholder="Enter Email Id"
          fullWidth
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          error={emailIdError}
        />
        <TextField
           sx={{ mt: 2, mb: 2 }}
          label="New Password"
          placeholder="Enter New Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          error={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ mt: 2, mb: 2 }}
          label="Confirm Password"
          placeholder="Confirm Paasword"
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          required
          error={confirmPasswordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          sx={{ mt: 2, mb: 2 }}
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleResetPassword}
        >
          Reset password
        </Button>
      </Paper>
    </Grid> 
    </>
  );
};

export default ResetPassword;
