import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const navigate = useNavigate();
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

  const handlLogout = () => {
    navigate("/");
    // localStorage.clear();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Avatar
          //   alt={decoded.image}
          src={decoded?.image || ""}
          sx={{ width: "35px", height: "35px" }}
        />
        <Typography> {decoded?.username || ""}</Typography>
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Typography>
          <span>FirstName:</span>
          {decoded?.firstName || ""}
        </Typography>
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Typography>
          <span>LastName:</span>
          {decoded?.lastName || ""}
        </Typography>
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Typography>
          <span>Gender:</span>
          {decoded?.gender || ""}
        </Typography>
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Typography>
          <span>Email:</span>
          {decoded?.email || ""}
        </Typography>
      </div>
      <div>
        <Button
          sx={{ backgroundColor: "red", color: "black", textTransform: "none" }}
          onClick={handlLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Profile;
