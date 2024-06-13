import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import axios from "axios";

const OrderHistory = () => {
    const [orderItems, setOrderItems] = useState([]);
    const { token } = useContext(DataContext);
    useEffect(() => {
        
        const fetchCustomerOrders = async () => {
            try {
                const customerData = await axios.get("http://localhost:5000/customer/getCutomerData",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setOrderItems(customerData?.data);
            }
            catch (error)
            {
                console.log(error);
            }
        }
        fetchCustomerOrders();
    },[orderItems])
    async function downloadInvoice(order)
    {
        const shipping = {
            name: order?.firstName + " " + order?.lastName,
            address: order?.address2 ? order?.address1 + " " + order?.address2 : order?.address1,
            city: order?.city,
            state: order?.state,
            country: order?.country
        };
        const orderId = order?.orderId;
        const totalAmount = order?.totalAmount;
        const items = order?.customerItems;
        const invoice_number = order?.invoiceNumber;
        const downLoadInvoiceData = { shipping, orderId, totalAmount, items, invoice_number };
        try {
            const response = await axios.post("http://localhost:5000/pdf/pdf-invoice", downLoadInvoiceData, {
                responseType:'blob'
            });

            const blob = new Blob([response?.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
          
        }
        catch (error)
        {
            console.log(error);
        }
    }
  return (
    <Container>
      <Typography
        align="center"
        variant="h5"
        component="h1"
        gutterBottom
        marginTop="10px"
      >
        Your Orders
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
                  {
                      orderItems.map((order) => (
                          <Paper key={order?._id} elevation={3} style={{padding:"16px",marginBottom:"20px"}}>
                              <Typography variant="h6" component='h2' gutterBottom>
                                  OrderId :{order?.orderId}
                              </Typography>
                              <Box>
                                  <Typography variant="body1">OrderedAt :{new Date(order?.orderedAt).toLocaleString()}</Typography>
                              </Box>
                              <List dense>
                                  {
                                      order?.customerItems.map((customer) => (
                                          <ListItem key={customer?.id}>
                                              <ListItemAvatar>
                                                  <Avatar
                                                      src={customer?.thumbnail}
                                                      alt={customer?.title}
                                                      variant="square"
                                                  />
                                             </ListItemAvatar>
                                              <ListItemText
                                                  primary={customer?.title}
                                                  secondary={`Quantity :${customer?.quantity} | Price:${Math.trunc(customer?.price * 84 * customer?.quantity).toLocaleString("en-In", {
                                                      style: "currency",
                                                      currency:"INR"
                                                  })}`}
                                              />
                                          </ListItem>
                                      ))
                                }
                              </List>
                              <Grid container justifyContent='space-between' alignContent='center'>
                                  <Typography variant='h5' component='h1'>
                                      Total : {Math.trunc(order?.totalAmount).toLocaleString("en-In", {
                                                      style: "currency",
                                                      currency:"INR"
                                                  })}
                                  </Typography>
                                  <Button
                                      variant="contained"
                                      onClick={()=>downloadInvoice(order)}
                                      style={{ backgroundColor: "green", color: 'white' }}>
                                      Invoice
                                  </Button>
                              </Grid>

                          </Paper>
                      ))
        }          
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderHistory;
