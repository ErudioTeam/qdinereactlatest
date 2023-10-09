import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { ProfilePage } from "./pages/Profile";
import { SettingsPage } from "./pages/Settings";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import { UserCreate } from "./pages/UserCreate.js";

import { UserRead } from "./pages/UserRead.js";
import { UserDelete } from "./pages/UserDelete.js";
import { UserEdit } from "./pages/UserEdit.js";

import { ProductList } from "./pages/Product/ProductList.js";

import { ProductDelete } from "./pages/Product/ProductDelete.js";
import { ProductEdit } from "./pages/Product/ProductEdit.js";

import "./styles.css";
import ProductCreate from "./pages/Product/ProductCreate.js";

import CartList from "./pages/Cart/CartList.js";
import ShoppingCart from "./pages/Cart/ShopingCart";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="usercreate" element={<UserCreate />} />
        <Route path="userread" element={<UserRead />} />
        <Route path="userdelete/:id" element={<UserDelete />} />
        <Route path="useredit/:id" element={<UserEdit />} />
        <Route path="productcreate" element={<ProductCreate />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="productedit/:id" element={<ProductEdit />} />
        <Route path="productdelete/:id" element={<ProductDelete />} />

        <Route path="cartlist" element={<CartList />} />
        <Route path="cartadd" element={<ShoppingCart />} />
      </Route>

      {/*   <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usercreate" element={<UserCreate />} />
        <Route path="/userread" element={<UserRead />} />
        <Route path="/userdelete/:id" element={<UserDelete />} />
        <Route path="/useredit/:id" element={<UserEdit />} />
        <Route path="/productcreate" element={<ProductCreate />} />
        <Route path="/productchange" element={<ProductChange />} />

        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productedit/:id" element={<ProductEdit />} />
        <Route path="/productdelete/:id" element={<ProductDelete />} />

        <Route path="/cartlist" element={<CartList />} />
        <Route path="/cartadd" element={<ShoppingCart />} />
        Define Edit route
       */}
    </Routes>
  );
}
