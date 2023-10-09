import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" },
          { label: "Create", path: "usercreate" },
          { label: "User List", path: "userread" },
          { label: "Product List", path: "productlist" },
          { label: "Product Create", path: "productcreate" },
          { label: "Cart List", path: "cartlist" }
        ]}
      />
      {outlet}
    </div>
  );
};
