import { useEffect, useContext, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Login2 } from "../Context/Login2.jsx";
import Rating from "@mui/material/Rating";
import BasicModal from "./ProductDetailpage.jsx";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

function Product2() {
  const [editDescription, setEditDescription] = useState("");
  const [edittitle, setEdittitle] = useState("");
  const [editprice, seteditprice] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [Remove, setRemove] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    data: null,
  });
  console.log("avatar", avatar);
  console.log("avatar2", Boolean(avatar));
  console.log("remove", Remove);

  const handleClose = () => {
    setModal({
      open: false,
      data: null,
    });
  };
  console.log("Modal", modal);
  const fileUploadRef = useRef();

  //   const handleImageUpload = (event) => {
  //     event.preventDefault();
  //     fileUploadRef.current.click();
  //   };

  const uploadImageDisplay = async () => {
    try {
      // fileUploadRef.current.click();
      // const uploadedFile = fileUploadRef.current.files[0];
      // const cachedURL = URL.createObjectURL(uploadedFile);
      const uploadedFiles = Array.from(fileUploadRef.current.files);
      const cachedURLs = uploadedFiles.map((file) => URL.createObjectURL(file));
      setAvatar(cachedURLs);
    } catch (error) {
      console.error(error);
      setAvatar(null);
    }
  };
  // const uploadImageDisplay = (e) => {
  //   console.log("Target", e.target.files);
  //   const data2 = setediting(e.target.files);
  //   const imageUrls = data2.map((data22) => URL.createObjectURL(data22));
  //   setAvatar(imageUrls);
  // };
  const handleOpen = (product) => {
    setModal({
      open: true,
      data: product,
    });
    seteditprice(product.price);
    setEdittitle(product.title);
    setEditDescription(product.description);
    setAvatar(product.images);
  };
  const handleclick = (index) => {
    console.log("index", index);

    const fill = avatar.filter((item, iIndex) => iIndex !== index);
    console.log("fill", fill);
    setAvatar(fill);
  };
  const { product, setproduct } = useContext(Login2);
  console.log("product", product);
  useEffect(() => {
    console.log("api called");

    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();

          setproduct(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  console.log("avtar", avatar, Boolean(avatar));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      {Array.isArray(product.products) &&
        product.products.map((products, index) => (
          <Grid key={index} container spacing={2}>
            <Grid sx={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  color: "black",
                  top: "1%",
                  left: "5%",
                }}
              >
                <p
                  style={{
                    backgroundColor: "#ffecec",
                    padding: "3px",
                    borderRadius: "10px",
                  }}
                >
                  -{products.discountPercentage}%
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "270px",
                  height: "250px",
                  backgroundColor: "rgba(0,0,0,1)",
                  borderRadius: "8px 8px 0px 0px",
                }}
              >
                <img
                  src={products.images?.[0]}
                  alt={products.title}
                  height={180}
                  width={190}
                  style={{ objectFit: "contain" }}
                  onClick={() => handleOpen(products)}
                />
              </div>

              <div>
                <h4
                  style={{
                    margin: "0px",
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {products.title.slice(0, 12)}
                </h4>
                <div>
                  <p
                    style={{
                      margin: "0px",
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    ${products.price}
                  </p>
                  <p
                    style={{
                      margin: "0px",
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Rating
                      name="size-small"
                      defaultValue={products.rating}
                      size="small"
                    />
                    <span style={{ marginLeft: "8px" }}>{products.rating}</span>
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        ))}

      {modal.open && (
        <BasicModal isOpen={modal.open} onClose={handleClose}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              onChange={(e) => {
                setEdittitle(e.target.value);
              }}
              id="outlined-static"
              label="Product-Title"
              fullWidth
              defaultValue={modal.data.title}
            />

            {avatar && (
              <div>
                {avatar.map((avatar2, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={avatar2 || modal.data.images}
                      alt={modal.data.title}
                      style={{
                        width: "60%",
                        objectFit: "contain",
                        position: "relative",
                      }}
                      key={index}
                    />
                    <CloseIcon
                      sx={{
                        position: "absolute",
                        right: "12%",
                        textTransform: "none",
                        color: "white",
                        backgroundColor: "black",
                        fontSize: "14px",
                        height: "30px",
                        width: "30px",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                      onClick={() => {
                        // setAvatar(null);
                        handleclick(index);
                        setRemove(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {Remove && avatar.length == 0 && (
              <>
                {/* <Button
                  type="submit"
                  onClick={(e) => {
                    handleImageUpload(e);
                    setremovemain(true);
                    // setRemove(false);
                  }}
                  sx={{
                    textTransform: "none",
                    color: "white",
                    backgroundColor: "green",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  Edit
                </Button> */}
                <input
                  type="file"
                  id="file"
                  multiple
                  ref={fileUploadRef}
                  onChange={(e) => {
                    uploadImageDisplay(e);
                  }}
                  accept="image/jpeg , image/svg, image/png"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                />
              </>
            )}
            <TextField
              onChange={(e) => {
                console.log(e.target.value);
                setEditDescription(e.target.value);
              }}
              id="outlined-multiline-static"
              label="Product-Description"
              multiline
              fullWidth
              rows={4}
              defaultValue={modal.data.description}
            />
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Product-Price
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    seteditprice(e.target.value);
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Product-Price"
                type="number"
                defaultValue={modal.data.price}
                inputProps={{ min: 0 }}
              />
            </FormControl>
            <Rating
              name="read-only"
              value={modal.data.rating}
              readOnly
              precision={0.5}
            />
            <Button
              type="button"
              sx={{
                bgcolor: "red",
                color: "white",
                textTransform: "none",
                marginTop: "20px",
              }}
              onClick={() => {
                const updatedProducts = product.products.map((p) =>
                  p.id === modal.data.id
                    ? {
                        ...p,
                        title: edittitle,
                        description: editDescription,
                        price: editprice,
                        images: [avatar],
                      }
                    : p
                );

                console.log("updatedProducts", updatedProducts);
                setproduct({ ...product, products: updatedProducts });
                handleClose();
                setRemove(false);
              }}
            >
              {" "}
              Update
            </Button>
          </div>
        </BasicModal>
      )}
    </Box>
  );
}

export default Product2;

// Reference
// https://blog.greenroots.info/series/react
// issuse is whe remove the remove image using the cross icon then upload that time not show button for every item & 2nd is showing issus
