import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

const settings = ["Profile", "Dashboard", "Logout"];
function Header() {
  const navigate = useNavigate();

  const tData = localStorage.getItem("accessToken");

  console.log("tData", Boolean(tData));

  const handlremove = () => {
    navigate("/dashboard");
  };
  const handlLogout = () => {
    navigate("/");
    localStorage.clear();
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
        console.log("Decoded JWT:", decodedToken);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleprofile = () => {
    navigate("/profile");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#1c1c1c",
        boxShadow: "0px 0px 5px rgb(19, 13, 13)",
        height: "100px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3
            style={{
              color: "White",
              margin: "0px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            Usecontext
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              textTransform: "none",
              color: "white",
              textDecoration: "none",
            }}
            onClick={handlremove}
          >
            Home
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={decoded?.name || "User"}
                src={decoded?.image || ""}
                sx={{ width: "35px", height: "35px" }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleprofile}>
              <Typography sx={{ textAlign: "center" }}>
                {settings[0]}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleDashboard}>
              <Typography sx={{ textAlign: "center" }}>
                {settings[1]}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handlLogout}>
              <Typography sx={{ textAlign: "center" }}>
                {settings[2]}
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
