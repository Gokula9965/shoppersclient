import { styled, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import mens from "../assets/mens.jpg";
import womens from "../assets/womens.jpg";
import beauty from "../assets/beauty.jpg";
import smart from "../assets/gagets.jpg";
import sports from "../assets/sports.jpg";
import grocery from "../assets/groceries.jpg";
import appliances from "../assets/appliances.jpg";
import decorify from "../assets/decorify.jpg";
const Container = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "20px",
  justifyContent: "space-between",
  flexWrap: "wrap",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  flex: "1 1 21%",
  margin: "3px",
  textDecoration: "none",
  [theme.breakpoints.down("md")]: {
    flex: "1 1 45%",
  },
  [theme.breakpoints.down("sm")]: {
    flex: "1 1 100%",
  },
}));

const Contain = styled("div")(() => ({
  width: "100%",
  height: "50vh",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const Image = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const Info = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Title = styled("h1")(() => ({
  color: "white",
  marginBottom: "20px",
}));

const Button = styled("button")(() => ({
  border: "none",
  padding: "10px",
  backgroundColor: "white",
  color: "gray",
  cursor: "pointer",
  fontWeight: 600,
}));

const Products = () => {
  const category = [
    {
      id: 1,
      title: "Mens",
      image: mens,
      category:"mens"
    },
    {
      id: 2,
      title: "Womens",
      image: womens,
      category:"womens"
    },
    {
      id: 3,
      title: "Cosmetics",
      image: beauty,
      category:"beauty"
    },
    {
      id: 4,
      title: "SmartSet",
      image: smart,
      category:"smart"
    },
    {
      id: 5,
      title: "Sports",
      image:sports,
      category:"sports"
    },
    {
      id: 6,
      title: "Daily Needs",
      image:grocery,
      category:"groceries"
    },
    {
      id: 7,
      title: "Decorify",
      image:decorify,
      category:"decorify"
    },
    {
      id: 8,
      title: "Appliances",
      image:appliances,
      category:"appliances"
    }
  ];

  return (
    <div id='products'>
      <Typography variant="h4" gutterBottom align="center" style={{fontSize:"3  0px"}}>
        PRODUCTS
      </Typography>
      <Container>
        {category.map((item) => (
          <StyledLink to={`/products/${item?.category}`}  key={item?.id}>
            <Contain>
              <Image src={item?.image} />
              <Info>
                <Title>{item?.title?.toUpperCase()}</Title>
                <Button>SHOP NOW</Button>
              </Info>
            </Contain>
          </StyledLink>
        ))}
      </Container>
    </div>
  );
};

export default Products;
