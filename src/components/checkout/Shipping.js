import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { IndianCities } from "./IndianCities";
import DataContext from "../../context/DataContext";

const Shipping = () => {

  const {firstName,
    setFirstName, lastName, setLastName, address1, setAddress1, address2, setAddress2, state, setState,city, setCity, postalCode, setPostalCode, country, firstError, lastError, address1Error, cityError, email,setEmail,phone,
    setPhone,
    emailError,
    phoneError
     } = useContext(DataContext);
  function handleCityChange(event, value) {
    setCity(value?.city || "");
    setState(value?.state || "");
  }
  return (
    <>
      <Typography variant="h6" component="h2">
        Shipping
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="standard"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="standard"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            variant="standard"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address Line 1"
            variant="standard"
            fullWidth
            required
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            error={address1Error}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address Line 2"
            variant="standard"
            fullWidth
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="city"
            options={IndianCities}
            getOptionLabel={(option) => option?.city}
            onChange={handleCityChange}
           value={IndianCities.find((option)=>option?.city===city)??null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                variant="standard"
                required
                fullWidth
                value={city}
                error={cityError}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State/Region/Province"
            fullWidth
            required
            value={state}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip/PostalCode"
            fullWidth
            required
            value={postalCode}
            onChange={(e)=>setPostalCode(e?.target?.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Country"
            fullWidth
            required
            value={country} 
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Shipping;
