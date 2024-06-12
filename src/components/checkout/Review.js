import { List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'

const Review = () => {
  const { cartItems, checkoutData, tax, total } = useContext(DataContext);
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {
          cartItems?.map((cart) => (
            <ListItem key={cart?._id} sx={{py:1,px:0}}>
              <ListItemText>
                {cart?.title}
              </ListItemText>
              <Typography variant='subtitle1'>{
                Math.trunc(cart?.price * cart?.quantity).toLocaleString("en-In", {
                  style: 'currency',
                  currency:'INR'
              })
              }</Typography>
            </ListItem>
          ))
        }
        <ListItem  sx={{py:1,px:0}}>
          <ListItemText>
            Tax
          </ListItemText>
          <Typography  variant='subtitle1'>{Math.trunc(tax).toLocaleString("en-In", {
            style: "currency",
            currency:'INR'
          })}</Typography>
        </ListItem>
        <ListItem  sx={{py:1,px:0}}>
          <ListItemText>
            Total
          </ListItemText>
          <Typography  variant='subtitle1'>{Math.trunc(total).toLocaleString("en-In", {
            style: "currency",
            currency:'INR'
          })}</Typography>
        </ListItem>
      </List>
      <hr />
      <Typography variant='h6' gutterBottom>
        Shipping Details
      </Typography>
      <Typography>
        {`${checkoutData?.firstName}  ${checkoutData?.lastName}`}<br/>
        {checkoutData?.email}<br />
        {checkoutData?.phone}<br/>
        {checkoutData?.address1}<br/>
        {`${checkoutData?.city} - ${checkoutData?.postalCode}`}<br/>
        {checkoutData?.state}<br />
        {checkoutData?.country}
      </Typography>
    </>
  )
}

export default Review