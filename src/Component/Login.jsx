import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { Login2 } from "../Context/Login2.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const { login, setLogin } = useContext(Login2);
  console.log("logindata", login);
  const navigate = useNavigate();
  const handellogin = async () => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        type: "CORS",
        body: JSON.stringify({ username, password }),
      });
      console.log({ res });

      if (res.ok) {
        const data = await res.json();
        console.log({ data });
        localStorage.setItem("accessToken", data.accessToken);
        setLogin(data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
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
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Log in
        </h1>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Enter your details below
        </p>
      </div>
      <div>
        <div>
          <TextField
            required
            value={username}
            id="standard-basic"
            label="Email or Phone Number"
            variant="standard"
            style={{ width: "370px", fontSize: "16px", color: "#ffffff" }}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            variant="standard"
            style={{ width: "370px", fontSize: "16px", marginTop: "20px" }}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "20px" }}
            onClick={handellogin}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
