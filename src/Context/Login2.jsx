import { createContext, useState } from "react";

export const Login2 = createContext({
  login: null,
  setLogin: () => {},
  product: null,
  setproduct: () => {},
});

export const Loginprovider = (props) => {
  const [loginData, setloginData] = useState([]);
  const [productdata, setpoductdata] = useState([]);
  const handleData = (data) => {
    console.log("data", data);

    setloginData(data);
  };
  const handleData2 = (data2) => {
    console.log("from context fun", data2);
    setpoductdata(data2);
  };
  return (
    <Login2.Provider
      value={{
        login: loginData,
        setLogin: handleData,
        product: productdata,
        setproduct: handleData2,
      }}
    >
      {props.children}
    </Login2.Provider>
  );
};
