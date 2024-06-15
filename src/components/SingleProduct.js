import { Alert, Avatar, Box, Button, Card, CardMedia, Container, Grid, IconButton, Paper, Rating, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DataContext from "../context/DataContext";
import BACKENDURL from "../Api";
const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [mainImage, setMainImage] = useState();
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState([]);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(2);
  const { handleCart,quantity, setQuantity,   showAlert,
    setShowAlert,
    alertMessage,
    alertSeverity,
    setAlertMessage,
    authName,
    setAlertSeverity,} = useContext(DataContext);
    const [reviewerName, setReviewerName] = useState(authName);
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const getProduct = await axios.get(
          `${BACKENDURL}/products/getProduct/${id}`
        );  
        const data = getProduct?.data;
        setSingleProduct(data);
        setMainImage(data?.thumbnail);
        setRating(data?.rating)
        setReviewData(data?.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
  }, [id]);
  function handleClickImage(image) {
    setMainImage(image);
  }
  function handleQuantity(value) {
    setQuantity((previousQuantity) => Math.max(previousQuantity + value, 0));
  }
  function handleCartDetails(_id,title,price,thumbnail,category)
  {
    const data = { _id, title, price, thumbnail, quantity, category };
    handleCart(data);   
  }
  async function handleReview(id) {
    const rating = value;
    const currentDate = new Date();
    const date = currentDate.toISOString();
    const reviewDetails = { rating, comment, reviewerName, date };
    try {
      const status = await axios.patch(`${BACKENDURL}/products/addReview/${id}`, reviewDetails);
      console.log(status);
     if(status?.data?.msg==="updated")
     {
       setReviewData([ reviewDetails,...reviewData]);
      setAlertMessage("Thank you for your review");
        setAlertSeverity("success");
       setShowAlert(true);
       setValue(2);
       setComment("");
      }
    }
    catch (error)
    {
      setAlertMessage("Can't add your review");
      setAlertSeverity("error");
      setShowAlert(true);
      console.log(error);
    }

  }
  return (
  
    <Container maxWidth="md" sx={{ padding: "70px", margin: "auto" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component='img'
              image={mainImage}
              sx={{ height: "100%", width: "100%" }}
            />
          </Card>
          <Box display="flex" justifyContent="center" mt={2}>
            {
              singleProduct?.images?.map((img, index) => (
                <CardMedia
                  component='img'
                  key={index}
                  image={img}
                  sx={{  margin: '0 4px',height: "80px", width: "80px", cursor: "pointer",border:"1px solid black"}}
                  onClick={()=>handleClickImage(img)}
              />
              ))
            }
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
          <Typography variant="h4" component= 'h1' gutterBottom>
            {singleProduct?.title}
          </Typography>
          <Rating name="read-only" value={rating} readOnly/>
          <Typography variant="body1" gutterBottom style={{ textAlign: "justify" }}>
            {singleProduct?.description}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
            InStock : {singleProduct?.stock}
          </Typography>
          <Typography variant="h5" component='p' gutterBottom>
          {Math.trunc(singleProduct?.price * 84 ).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={()=>handleQuantity(-1)}>
              <RemoveIcon/>
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              inputProps={{ min: 0, style: { textAlign: "center", width: '40px' } }}
              variant="outlined"
            />
             <IconButton onClick={singleProduct?.stock > quantity?()=>handleQuantity(1):null}>
              <AddIcon/>
            </IconButton>
            <Button variant="contained" style={{backgroundColor:"#FF681F",color:"white"}} sx={{ marginLeft: '16px'}} onClick={()=>handleCartDetails(singleProduct?._id,singleProduct?.title,singleProduct?.price,singleProduct?.thumbnail,singleProduct?.category)}>
              Add To Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box component='form' mt={4}>
        <Snackbar
              open={showAlert}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setShowAlert(false)}
            >
              <Alert
                onClose={() => setShowAlert(false)}
                severity={alertSeverity}
                sx={{ width: "100%", color: "white", background: "green" }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          <Typography variant='h5' component='h2' gutterBottom sx={{mb:2}}>
            Add a Review
          </Typography>
          <TextField
            sx={{mb:2}}
            label="Name"
            required
            fullWidth
            autoComplete="off"
            variant='outlined'
            value={reviewerName}
            onChange={(e)=>setReviewerName(e.target.value)}
          />
          <Rating
            sx={{mb:2}}
            name='simple-controlled'
            label="Rating"
            value={value}
            onChange={(e,newValue)=>setValue(newValue)}
          />

          <TextField
            sx={{mb:2}}
            label='Comment'
            variant='outlined'
            multiline
            rows={4}
            fullWidth
            required
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />

          <Button variant='contained' style={{backgroundColor:"#FF681F",color:"white"}} onClick={()=>handleReview(singleProduct?._id)}>
           Submit Review
          </Button>
        </Box>
      <Box mt={4}>
        <Typography variant='h5' component='h2' gutterBottom>
          Customer Reviews
        </Typography>
        {
         reviewData?.map((rev, index) => (
            <Paper key={index} elevation={3} sx={{padding:'16px',marginBottom: '16px' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar  alt={rev.reviewerName} style={{ backgroundColor:"violet",marginRight:"16px"
                }}>
                   {rev?.reviewerName[0]?.toUpperCase()}
                </Avatar>
                <Box>
                <Typography variant='subtitle1'>
                  { rev?.reviewerName}
                </Typography>
                <Typography variant="body2" color="textSecondary" >
               {new Date(rev?.date).toLocaleString()}
                </Typography>
                </Box>
              </Box>
              <Rating name="read-only" value={rev?.rating} readOnly />
              <Typography variant="body2" style={{textAlign:"justify"}}>
               {rev?.comment}
              </Typography>
            </Paper>
          ))
        }
      </Box>
    </Container>
  );
};

export default SingleProduct;
