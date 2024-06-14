import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import emailjs from "@emailjs/browser";
import DataContext from "../context/DataContext";
const styles = {
  root: {
    flexGrow: 1,
    padding: "16px",
    backgroundColor: "#333", // Dark background color
    color: "#fff", // Text color
  },
  paper: {
    padding: "16px",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent dark background color for forms
    color: "white", // Text color
    border: "none", // Remove outer border
  },
  contactInfo: {
    alignItems: "center",
    marginTop: "20px",
  },
  contactInfo1: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  icon: {
    marginRight: "10px",
  },
};

const ContactUs = () => {
  const {
    showAlert,
    setShowAlert,
    alertMessage,
    alertSeverity,
    setAlertMessage,
    setAlertSeverity,
  } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_96mg29x",
        "template_cjllp4b",
        event.target,
        "K882p-yusBAUHagq_"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormData({ name: "", email: "", message: "" });
          setAlertMessage("Message sent successfully");
          setAlertSeverity("success");
          setShowAlert(true);
        },
        (error) => {
          console.error(error.text);
          setAlertMessage("Failed to send message");
          setAlertSeverity("error");
          setShowAlert(true);
        }
      );
  };

  return (
    <>
      <div style={styles.root} id="contact">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              About us
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              style={{ marginTop: "20px" }}
            >
              At Shoppers, we offer a diverse range of high-quality products,
              from fashion and electronics to home goods and beauty items, all
              at competitive prices. Our mission is to make shopping easy and
              enjoyable, with fast delivery and excellent customer support.
              Thank you for choosing Shoppers – your satisfaction is our
              priority!
            </Typography>
            <div style={styles.contactInfo}>
              <Typography variant="h6">Address</Typography>
            </div>
            <div style={styles.contactInfo1}>
              <LocationOnIcon style={styles.icon} />
              <Typography variant="body2">
                Avinashi Rd, Civil Aerodrome Post,
                <br />
                Coimbatore,
                <br /> Tamil Nadu - 641014
              </Typography>
            </div>
            <div style={styles.contactInfo1}>
              <PhoneIcon style={styles.icon} />
              <Typography variant="body2">+917604878903</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" gutterBottom align="center">
              Contact Us
            </Typography>
            <Paper
              style={{ ...styles.paper, border: "none", boxShadow: "none" }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      variant="standard"
                      fullWidth
                      autoComplete="off"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: { color: "#fff" } }}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="standard"
                      fullWidth
                      autoComplete="off"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: { color: "#fff" } }}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      variant="standard"
                      fullWidth
                      multiline
                      rows={4}
                      autoComplete="off"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: { color: "#fff" } }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
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
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Typography
        variant="body1"
        component="h2"
        align="center"
        style={{
          backgroundColor: "#333", // Dark background color
          color: "#fff",
        }}
      >
        <Typography
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "white",
          }}
        >
          &copy; {new Date().getFullYear()} Shoppers. All rights reserved.
        </Typography>
      </Typography>
    </>
  );
};

export default ContactUs;
