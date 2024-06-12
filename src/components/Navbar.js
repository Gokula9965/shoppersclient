import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Avatar, Badge, Modal } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "@fontsource/montez";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const menu = [
  {
    title: "Home",
    icon: null,
  },
  {
    title: "Products",
    icon: null,
  },
  {
    title: "Contact Us",
    icon: null,
  },
];

const Navbar = () => {
  const {
    authName,
    drawerOpen,
    anchorEl,
    handleDrawerToggle,
    handleMenuOpen,
    handleLogout,
    handleMenuClose,
    count,
    popUpOpen,
    handleCartClick,
    handlePopUpClose
  } = useContext(DataContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  function scrollToView(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function handleMenuClick(title) {
    if (title === "Home") {
      navigate("/");
    } else if (title === "Products") {
      scrollToView("products");
    }
    else if (title === "Contact Us")
    {
      scrollToView("contact")
      }
    handleDrawerToggle();
  }

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "black",
        color: "white",
        height: "100vh",
      }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {menu.map((item) => (
          <ListItem
            button
            key={item.title}
            onClick={() => handleMenuClick(item.title)}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: "#0e1b20" }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {isMobile && (
            <Typography
              variant={theme.breakpoints.values.sm ? "h3" : "h5"}
              noWrap
              sx={{ flexGrow: 1, fontFamily: "'montez','cursive'" }}
            >
              S
            </Typography>
          )}
          {!isMobile && (
            <Typography
              variant="h3"
              style={{ fontFamily: "'montez','cursive'" }}
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Shoppers
            </Typography>
          )}

          <Box sx={{ display: "flex", flexGrow: -1, justifyContent: "center" }}>
            {!isMobile && (
              <>
                <Button color="inherit" onClick={() => navigate("/")}>
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={() => scrollToView("products")}
                >
                  Products
                </Button>
                <Button color="inherit" onClick={() => scrollToView("contact")}>
                  Contact Us
                </Button>
              </>
            )}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {authName && (
              <>
                <IconButton color="inherit" onClick={()=>handleCartClick("navbar")}>
                  <Badge badgeContent={count} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <Avatar style={{ backgroundColor: "#ff00ff" }}>
                    {authName[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </>
            )}
            {!authName && (
              <Button
                color="secondary"
                endIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>navigate("/orders")}>My Orders</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
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
            Please add items to your cart before proceeding.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
