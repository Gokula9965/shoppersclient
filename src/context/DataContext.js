import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKENDURL from "../Api";
const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const navigate = useNavigate("");
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [emailIdError, setEmailIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [authName, setAuthName] = useState("");
  const [token, setToken] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [firstError, setFirstError] = useState(false);
  const [lastError, setLastError] = useState(false);
  const [address1Error, setAddress1Error] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [checkoutData, setCheckoutData] = useState('');
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogout(e) {
    e.preventDefault();
    setAuthName("");
    setToken("");
    localStorage.clear();
    handleMenuClose();
    setCount(0);
    navigate("/login");
  }

  function handleToggleVisibility() {
    setShowPassword(!showPassword);
  }

  function handleConfirmVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setUserNameError(false);
    setEmailIdError(false);
    setPasswordError(false);

    if (userName === "") {
      setUserNameError(true);
    }
    if (emailId === "") {
      setEmailIdError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (containsOnlyNumbers(userName)) {
      setUserNameError(true);
      setAlertMessage("Username shouldn't contain numbers");
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    if (userName && password && emailId && !containsOnlyNumbers(userName)) {
      try {
        const response = await axios.post(
          `${BACKENDURL}/user/register`,
          { userName, emailId, password }
        );
        if (response.status === 200) {
          setAlertMessage("User registered successfully");
          setAlertSeverity("success");
          setShowAlert(true);
          setUserName("");
          setEmailId("");
          setPassword("");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setAlertMessage("Registration failed. Please try again.");
          setAlertSeverity("error");
          setShowAlert(true);
        }
      } catch (error) {
        console.log(error);
        setAlertMessage(`${error?.response?.data?.message}`);
        setAlertSeverity("error");
        setShowAlert(true);
      }
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    setEmailIdError(false);
    setPasswordError(false);
    if (emailId === "") {
      setEmailIdError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (emailId && password) {
      try {
        console.log(BACKENDURL);
        const response = await axios.post(`${BACKENDURL}/user/login`, {
          emailId,
          password,
        });
        if (response.status === 200) {
          const accessToken = response?.data?.accessToken;
          setToken(accessToken);
          try {
            const currentUser = await axios.get(
              `${BACKENDURL}/user/currentUser`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            setAuthName(currentUser?.data?.user?.userName);
            const currentData = currentUser?.data;
            currentData.accessToken = accessToken;
            localStorage.setItem("currentUser", JSON.stringify(currentData));
            const cartCounts = await axios.get(
              `${BACKENDURL}/cart/getCart`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            console.log(cartCounts?.data?.cartCount);
            setCount(cartCounts?.data?.cartCount);
          } catch (error) {
            setAlertMessage(`${error?.response?.data?.message}`);
            setAlertSeverity("error");
            setShowAlert(true);
          }
          setAlertMessage("Successfully logged In");
          setAlertSeverity("success");
          setShowAlert(true);
          setEmailId("");
          setPassword("");
          navigate("/");
        } else {
          setAlertMessage("Login Failed. Please try again.");
          setAlertSeverity("error");
          setShowAlert(true);
        }
      } catch (error) {
        setEmailId("");
        setPassword("");
        setAlertMessage(`${error.response.data.message}`);
        setAlertSeverity("error");
        setShowAlert(true);
      }
    }
  }
  async function handleResetPassword(e) {
    e.preventDefault();
    setEmailIdError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    if (emailId === "") {
      setEmailIdError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (confirmPassword === "") {
      setConfirmPassword(true);
    }
    if (emailId && password !== confirmPassword) {
      setAlertMessage("Password didn't match");
      setAlertSeverity("error");
      setShowAlert(true);
    }
    if (emailId && password === confirmPassword) {
      try {
        const response = await axios.patch(
          `${BACKENDURL}/user/reset-password`,
          { emailId, password }
        );
        if (response?.status === 200) {
          setAlertMessage("Successfully updated the password Now Login");
          setAlertSeverity("success");
          setShowAlert(true);
          setEmailId("");
          setPassword("");
          setConfirmPassword("");
          navigate("/login");
        }
      } catch (error) {
        setAlertMessage(`${error?.response?.data?.message}`);
        setAlertSeverity("error");
        setShowAlert(true);
      }
    }
  }
  async function handleCart(data) {
    try {
      const addToCartAndGetTheCount = await axios.post(
        `${BACKENDURL}/cart/addToCart`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(addToCartAndGetTheCount?.data?.cartCount);
      setCount(addToCartAndGetTheCount?.data?.cartCount);
    } catch (error) {
      console.log("Error in adding to the cart", error);
    }
    setQuantity(1);
  }
  async function handleRemoveItem(id) {
    try {
      console.log(id);
      const cartResponse = await axios.delete(
        `${BACKENDURL}/cart/deleteCart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCount(cartResponse?.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleChangeQuantity(id, quantity) {
    if (quantity >= 1) {
      const data = { id, quantity };
      try {
        const response = await axios.patch(
          `${BACKENDURL}/cart/updateCart`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setCartItems(
          cartItems.map((item) =>
            item?._id === id ? { ...item, quantity: quantity } : item
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  function handleCartClick(page) {
    if (count > 0 && page==="navbar") {
      navigate("/cartlist");
    }
    else if (count > 0 && page === "cart")
    {
      navigate("/checkout");  
    }
    else {
      setPopUpOpen(true);
    }
  }

  function handlePopUpClose(){
    setPopUpOpen(false);
  };
  async function handleCustomer(data) {
    try {
      const response = await axios.post(
        `${BACKENDURL}/customer/addItem`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    }
    catch (error)
    {
      console.log(error);
    }
  }
  async function handleDeletAllCart(){
    try {
      const response = await axios.delete(
        `${BACKENDURL}/cart/deleteAllCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(response?.data?.count);
    }
    catch (error)
    {
      console.log(error);
    }
  }
  async function handleInvoiceEmail(invoiceData) {
    try {
      const invoiceResponse = await axios.post(`${BACKENDURL}/pdf/pdfEmail`,invoiceData);
      console.log(invoiceResponse?.data);
    }
    catch (error)
    {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchStorage = async () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      let currentDate = new Date();
      let currentTimestamp = Math.floor(currentDate.getTime() / 1000);
      if (storedUser?.exp && currentTimestamp < storedUser?.exp) {
        try {
          const cartCounts = await axios.get(
            `${BACKENDURL}/cart/getCart`,
            {
              headers: {
                Authorization: `Bearer ${storedUser?.accessToken}`,
              },
            }
          );
          console.log(cartCounts?.data?.cartCount);
          setCount(cartCounts?.data?.cartCount);
          setAuthName(storedUser?.user?.userName);
          setToken(storedUser?.accessToken);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/login");
      }
    };
    (async () => await fetchStorage())();
  }, []);

  return (
    <DataContext.Provider
      value={{
        showPassword,
        setShowPassword,
        userName,
        setUserName,
        emailId,
        setEmailId,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        userNameError,
        setUserNameError,
        emailIdError,
        setEmailIdError,
        passwordError,
        setPasswordError,
        confirmPasswordError,
        setConfirmPasswordError,
        alertMessage,
        setAlertMessage,
        alertSeverity,
        setAlertSeverity,
        showAlert,
        setShowAlert,
        handleToggleVisibility,
        handleConfirmVisibility,
        handleRegister,
        handleLogin,
        handleResetPassword,
        authName,
        setAuthName,
        token,
        drawerOpen,
        setDrawerOpen,
        anchorEl,
        setAnchorEl,
        handleDrawerToggle,
        handleMenuOpen,
        handleLogout,
        handleMenuClose,
        count,
        setCount,
        handleCart,
        quantity,
        setQuantity,
        cartItems,
        setCartItems,
        handleRemoveItem,
        handleChangeQuantity,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        address1,
        setAddress1,
        address2,
        setAddress2,
        state,
        setState,
        city,
        setCity,
        postalCode,
        setPostalCode,
        country,
        setCountry,
        firstError,
        setFirstError,
        lastError,
        setLastError,
        address1Error,
        setAddress1Error,
        cityError,
        setCityError,
        checkoutData,
        setCheckoutData,
        tax,
        setTax,
        total,
        setTotal,
        email,
        setEmail,
        phone,
        setPhone,
        emailError,
        setEmailError,
        phoneError,
        setPhoneError,
        popUpOpen, setPopUpOpen,
        handleCartClick,
        handlePopUpClose,
        handleCustomer,
        handleDeletAllCart,
        handleInvoiceEmail
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
