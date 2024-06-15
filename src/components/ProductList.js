import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import DataContext from "../context/DataContext";
import BACKENDURL from "../Api";

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 250,
  margin: "auto",
  position: "relative",
  overflow: "hidden",
}));

const ProductMedia = styled(CardMedia)({
  height: 250,
  objectFit: "cover",
  backgroundColor: "#f5f5f5",
});

const ProductPrice = styled(Typography)({
  marginTop: 2,
  fontSize: "17px",
  color: "black",
  textAlign: "center",
});
const ProductTitle = styled(Typography)({
  marginTop: 15,
  fontWeight: "bold",
  color: "black",
  textAlign: "center",
});
const HoverContent = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "row",
  transform: "translateY(100%)",
  transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
  opacity: 0,
}));

const ProductCardWrapper = styled(motion.div)({
  position: "relative",
  "&:hover": {
    "& .hover-content": {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
});

const StyledIconButton = styled(IconButton)({
  color: "#fff",
});

const OutOfStockOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const navigate = useNavigate("");
  const { handleCart, quantity ,searchProducts} = useContext(DataContext);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedData = await axios.get(
          `${BACKENDURL}/products/${category}`
        );
        const productsData = fetchedData?.data?.data;
        setProducts(productsData);
        setOriginalProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [category]);
  useEffect(() => {
    if (searchProducts.length > 0) {
      const filterProducts = originalProducts?.filter((product) => ((product?.title?.toLowerCase()).includes(searchProducts.toLowerCase())));
      setProducts(filterProducts?.reverse());
    }
    else {
      setProducts(originalProducts);
    }

  }, [searchProducts, originalProducts]);

  function handleStopProgation(e) {
    e.stopPropagation();
  }

  function handleCartDetails(_id, title, price, thumbnail, quantity, category) {
    const data = { _id, title, price, thumbnail, quantity, category };
    handleCart(data);
  }

  function handleIsClicked() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <Button
        sx={{
          textTransform: "none",
          "& .MuiButton-startIcon": {
            marginRight: 0,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          color: "black",
        }}
        startIcon={<ArrowBackIosNew style={{ fontSize: "10px" }} />}
        onClick={() => {
          navigate("/");
        }}
      >
        back
      </Button>
      <Typography variant="h5" align="center" style={{ padding: 10 }}>
        {category === 'mens' ? "Mens".toUpperCase() : category === 'womens' ? "womens".toUpperCase() : category === 'beauty' ? "cosmetics".toUpperCase() : category === 'smart' ? "smart Devices".toUpperCase() : category === 'sports' ? "sports".toUpperCase() : category === 'groceries' ? "groceries".toUpperCase() : category === "decorify" ? "Decoration Items".toUpperCase() : "Home Appliances".toUpperCase()}
      </Typography>
      <Grid container spacing={3} sx={{ padding: 5 }}>
        {products.map((product) => (
          <Grid
            item
            key={product._id}
            xs={12}
            sm={6}
            md={3}
            onClick={() => {
              if (product.stock > 0) {
                navigate(`/singleProduct/${product?._id}`);
              }
            }}
          >
            <ProductCardWrapper
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ProductCard>
                <CardActionArea>
                  <ProductMedia
                    component="img"
                    image={product?.thumbnail}
                    title={product?.title}
                  />
                  {product.stock === 0 && (
                    <OutOfStockOverlay>Out of Stock</OutOfStockOverlay>
                  )}
                </CardActionArea>
                {product?.stock >0 &&
                  <HoverContent
                    className="hover-content"
                    style={{ cursor: "pointer" }}
                  >
                    <StyledIconButton
                      onClick={(e) => {
                        handleStopProgation(e);
                        handleCartDetails(
                          product?._id,
                          product?.title,
                          product?.price,
                          product?.thumbnail,
                          quantity,
                          product?.category
                        );
                      }}
                    >
                      <AddShoppingCartIcon style={{ fontSize: "2rem" }} />
                    </StyledIconButton>
                    <StyledIconButton key={product?._id} onClick={(e) => {
                      handleStopProgation(e);
                      handleIsClicked();
                    }
                    } style={{ color: isClicked ? "red" : null }}>
                      <FavoriteIcon style={{ fontSize: "2rem" }} />
                    </StyledIconButton>
                    <StyledIconButton onClick={(e) => handleStopProgation(e)}>
                      <ShareIcon style={{ fontSize: "2rem" }} />
                    </StyledIconButton>
                  </HoverContent>
                }
              </ProductCard>
            </ProductCardWrapper>
            <ProductTitle variant="h6" component="p">
              {product?.title}
            </ProductTitle>
            <ProductPrice variant="h6" component="p">
              {Math.trunc(product.price * 84).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </ProductPrice>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
