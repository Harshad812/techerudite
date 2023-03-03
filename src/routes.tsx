import { Route, Routes } from "react-router-dom";
import { Home, Signin, Signup } from "./module";

export const RoutesMapping = {
  Home: "/home",
  Signin: "/signin",
  Signup: "/signup",
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Signup />} />
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Signup/customer" element={<Signup />} />
      <Route path="/Signup/admin" element={<Signup />} />
    </Routes>
  );
};
