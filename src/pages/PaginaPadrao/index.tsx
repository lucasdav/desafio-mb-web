import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}
