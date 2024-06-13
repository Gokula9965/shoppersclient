import React, { useContext, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  IconButton,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import DataContext from "../context/DataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BACKENDURL from "../Api";
const CartList = () => {
  const {
    cartItems,
    setCartItems,
    handleRemoveItem,
    handleChangeQuantity,
    token,
    setCount,
    setTax,
    setTotal,
    popUpOpen,
    handleCartClick,
    handlePopUpClose,
    count
  } = useContext(DataContext);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item?.price * 84 * item?.quantity,
    0
  );

  const tax = (subtotal * 0.08).toFixed(2);
  setTax(Number(tax));
  const total = subtotal + Number(tax);
  setTotal(total);
  const theme = useTheme();
  const navigate = useNavigate("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsFromDb = await axios.get(
          `${BACKENDURL}/cart/getCartItems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems(cartItemsFromDb?.data?.cart);
        setCount(cartItemsFromDb?.data?.cartCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  },[cartItems,count]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
        height: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!isMobile ? (
              <>
                <TableContainer
                  component={Paper}
                  sx={{ border: "none", overflowX: "hidden" }}
                >
                  <Table
                    sx={{
                      width: "100%",
                      "& .MuiTableCell-root": {
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        padding: "8px 16px",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item?.id}>
                          <TableCell>
                            <img
                              src={item?.thumbnail}
                              alt={item?.title}
                              style={{ maxWidth: "100px", maxHeight: "100px" }}
                            />
                          </TableCell>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell>
                            {Math.trunc(item?.price * 84).toLocaleString(
                              "en-IN",
                              {
                                style: "currency",  
                                currency: "INR",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <IconButton
                                onClick={() =>
                                  handleChangeQuantity(
                                    item?._id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item?.quantity <= 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <TextField
                                value={item?.quantity}
                                onChange={(e) =>
                                  handleChangeQuantity(
                                    item?._id,
                                    parseInt(e.target.value)
                                  )
                                }
                                inputProps={{
                                  min: 0,
                                  style: { textAlign: "center", width: "40px" },
                                }}
                                variant="outlined"
                              />
                              <IconButton
                                style={{ color: "black" }}
                                onClick={() =>
                                  handleChangeQuantity(
                                    item?._id,
                                    item?.quantity + 1
                                  )
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {Math.trunc(
                              item?.price * 84 * item?.quantity
                            ).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              style={{ color: "red" }}
                              onClick={() => handleRemoveItem(item?._id)}
                            >
                              <ClearIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell>
                          <Typography variant="h6">SubTotal</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            {Math.trunc(subtotal).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell>
                          <Typography variant="h6">Tax</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            {Math.trunc(tax).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell>
                          <Typography variant="h6">Total</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            {Math.trunc(total).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Button color="secondary" onClick={()=>navigate("/")}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={()=>handleCartClick("cart")}>
                    Checkout
                  </Button>
                </Box>
              </>
            ) : (
              <List sx={{ height: "100%" }}>
                {cartItems.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <ListItemText
                        primary={item?.title}
                        secondary={Math.trunc(item?.price * 84).toLocaleString(
                          "en-IN",
                          {
                            style: "currency",
                            currency: "INR",
                          }
                        )}
                      />
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => handleRemoveItem(item?._id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                      <Box display="flex" alignItems="center">
                        <IconButton
                          size="small"
                          style={{ color: "black" }}
                          onClick={() =>
                            handleChangeQuantity(item?._id, item.quantity - 1)
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          onChange={(e) =>
                            handleChangeQuantity(
                              item?._id,
                              parseInt(e.target.value)
                            )
                          }
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center", width: "40px" },
                          }}
                          variant="outlined"
                          size="small"
                        />
                        <IconButton
                          size="small"
                          style={{ color: "black" }}
                          onClick={() =>
                            handleChangeQuantity(item?._id, item.quantity + 1)
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="body2">
                        {Math.trunc(
                          item?.price * 84 * item?.quantity
                        ).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">SubTotal:</Typography>
                    <Typography variant="h6">
                      {Math.trunc(subtotal).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">Tax:</Typography>
                    <Typography variant="h6">
                      {Math.trunc(tax).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">
                      {Math.trunc(total).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <Button variant="outlined" color="secondary" onClick={()=>navigate("/")}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={()=>handleCartClick("cart")}>
                      Checkout
                    </Button>
                  </Box>
                </ListItem>
              </List>
            )}
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={popUpOpen}
        onClose={handlePopUpClose}
        aria-labelledby="empty-cart-popup"
        aria-describedby="empty-cart-message"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={handlePopUpClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="empty-cart-popup" variant="h6" component="h2">
            Cart is Empty
          </Typography>
          <Typography id="empty-cart-message" sx={{ mt: 2 }}>
            Please add items to your cart before checkout.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartList;
