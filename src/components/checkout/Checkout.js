import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Shipping from "./Shipping";
import Review from "./Review";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import BACKENDURL from "../../Api";
function getActiveStep(step) {
  switch (step) {
    case 0:
      return <Shipping />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknow step");
  }
}
const steps = ["Shipping", "Review And Pay"];
const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address1,
    address2,
    state,
    setState,
    city,
    setCity,
    postalCode,
    setPostalCode,
    country,
    setFirstError,
    setLastError,
    setCityError,
    setAddress1Error,
    setCheckoutData,
    total,
    checkoutData,
    email,
    setEmail,
    phone,
    setPhone,
    setAddress1,
    setEmailError,
    setPhoneError,
    cartItems,
    handleCustomer,
    handleDeletAllCart,
    handleInvoiceEmail
  } = useContext(DataContext);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  function generateRandomNumberWithHash() {
    let randomNumber = "#";
    for (let i = 1; i < 5; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

  function invoiceNumberWithHash() {
    const randomNum = Math.random() * 9000
    const formattedRandomNum = Math.floor(randomNum)
    return formattedRandomNum;
  }
  async function handleNext() {
    setFirstError(false);
    setLastError(false);
    setAddress1Error(false);
    setCityError(false);
    setEmailError(false);
    setPhoneError(false);
    if (activeStep === 0) {
      if (firstName === "") {
        setFirstError(true);
      }
      if (lastName === "") {
        setLastError(true);
      }
      if (address1 === "") {
        setAddress1Error(true);
      }
      if (city === "") {
        setCityError(true);
      }
      if (email === "") {
        setEmailError(true);
      }
      if (phone === "") {
        setPhoneError(true);
      }
      if (
        firstName &&
        lastName &&
        address1 &&
        city &&
        state &&
        postalCode &&
        country &&
        email &&
        phone
      ) {
        const data = {
          firstName,
          lastName,
          address1,
          city,
          state,
          postalCode,
          country,
          email,
          phone,
        };
        setCheckoutData(data);
        setActiveStep((previousStep) => previousStep + 1);
      }
    } else if (activeStep === 1) {
      const data = checkoutData;
      const orderId = generateRandomNumberWithHash();
      data.orderId = orderId;
      cartItems.forEach((obj) => {
        delete obj?._id;
        delete obj?.userId;
        delete obj?.__v;
        delete obj?.productId;
      });
      data.cartItems = cartItems;
      data.total = total;
      const shipping = {
        name: firstName + " " +lastName,
        address: address2 ? address1 + " " + address2 : address1,
        city,
        state,
        country,
        postalCode
      }
      const items = cartItems;
      const totalAmount = total;
      const invoice_number = invoiceNumberWithHash();
      const emailId = email;
      const invoiceData = { shipping, items, orderId, totalAmount, invoice_number, emailId };
      data.invoiceNumber = invoice_number;
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress1("");
      setCity("");
      setState("");
      setPostalCode("");
      handleCustomer(data);
      handleDeletAllCart();
      setOrderId(data.orderId);
      setActiveStep((previousStep) => previousStep + 1);
      handleInvoiceEmail(invoiceData);
    }
  }
  function handleBack() {
    setActiveStep((previousStep) => previousStep - 1);
  }

  const paymentHandler = async (e) => {
    const amount = parseInt(total) * 100;
    const currency = "INR";
    const receiptId = "qwsaq1";
    const response = await fetch(`${BACKENDURL}/payment/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_N1xiGtdYG6DACu",
      amount,
      currency,
      name: "Shoppers Corp",
      description: "Test Transaction",
      order_id: order?.id,
      handler: async function (response) {
        const body = {
          ...response,
        };
        const validateRes = await fetch(
          `${BACKENDURL}/payment/order/validate`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const validateResPonse = await validateRes.json();
        if (validateResPonse?.msg === "success") {
          handleNext();
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: checkoutData?.firstName + " " + checkoutData?.lastName, //your customer's name
        email: checkoutData?.email,
        contact: checkoutData?.phone, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" align="center">
        CheckOut
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5">Thank You For Your Order</Typography>
            <Typography variant="subtitle1">
              Your order number is {orderId}. We have emailed your Invoice
              and will send you an update when your order has
              shipped.
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{ mt: 3, ml: 1 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </>
        ) : (
          <>
            {getActiveStep(activeStep)}
            <Box display="flex" justifyContent="flex-end">
              {activeStep !== 0 && (
                <Button sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={paymentHandler}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Pay And Place Order
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </>
    </Container>
  );
};

export default Checkout;
