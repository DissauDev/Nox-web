import { Outlet } from "react-router-dom";

const NotFound = () => (
  <div className="p-6">
    <h2>Not found</h2>
    <Outlet />
  </div>
);

export default NotFound;
