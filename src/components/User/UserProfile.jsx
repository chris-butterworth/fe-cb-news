import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/Contexts";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h3>Profile Page</h3>
      <br />
      <h4>Logged in user: {user}</h4>
      <br />

      <Outlet />
    </div>
  );
}
