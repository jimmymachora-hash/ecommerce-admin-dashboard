
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Store,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Store size={28} />
        <h2>JimJam Store</h2>
      </div>

      <nav>
        <NavLink to="/" end>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/products">
          <Package size={20} />
          Products
        </NavLink>

        <NavLink to="/products/add">
          <PlusCircle size={20} />
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
