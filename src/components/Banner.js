import { useState } from "react";
import { styled } from "@mui/material/styles";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import banner1 from "../assets/banner1.jpg"
import banner2 from "../assets/banner2.jpg"
import banner3 from "../assets/banner3.jpg"
const sliderItems = [
  {
    id: 1,
    img: banner1,
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "#fefefe",
  },
  {
    id: 2,
    img: banner2,
    title: "AUTUMN COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fefefe",
  },
  {
    id: 3,
    img: banner3,
    title: "Beauty Products",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fefefe",
  },
];

const Container = styled('div')({
  width: "100%",
  height: "85vh",
  display: "flex",
  position: "relative",
  overflow: "hidden",
});

const Arrow = styled('div')(({ direction }) => ({
  width: "50px",
  height: "50px",
  backgroundColor: "black",
  color: 'white',
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: direction === "left" && "10px",
  right: direction === "right" && "10px",
  margin: "auto",
  cursor: "pointer",
  opacity: 0.5,
  zIndex: 2,
}));

const Wrapper = styled('div')(({ slideIndex }) => ({
  height: "100%",
  display: "flex",
  transition: "all 1.5s ease",
  transform: `translateX(${slideIndex * -100}vw)`, // Corrected here
}));

const Slide = styled('div')(({ bg }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  backgroundColor: `#${bg}`, // Corrected here
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const ImgContainer = styled('div')({
  height: "100%",
  flex: 1,
  '@media (max-width: 768px)': {
    height: "50%",
  },
});

const Image = styled('img')({
  height: "80%",
  width: "100%",
  objectFit: "cover",
});

const InfoContainer = styled('div')({
  flex: 1,
  padding: "50px",
  '@media (max-width: 768px)': {
    padding: "20px",
    textAlign: "center",
  },
});

const Title = styled('h1')({
  fontSize: "70px",
  '@media (max-width: 768px)': {
    fontSize: "40px",
  },
});

const Desc = styled('p')({
  margin: "50px 0px",
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "3px",
  '@media (max-width: 768px)': {
    margin: "20px 0px",
    fontSize: "16px",
    letterSpacing: "2px",
  },
});

const Button = styled('button')({
  padding: "10px",
  fontSize: "20px",
  backgroundColor: "transparent",
  cursor: "pointer",
  '@media (max-width: 768px)': {
    fontSize: "16px",
    padding: "8px",
  },
});

const Banner = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Banner;
