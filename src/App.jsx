import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Contact from "./pages/Contact.jsx";
import AdminShell from "./admin/AdminShell.jsx";
import CategoryForm from "./admin/CategoryForm.jsx";
import Categories from "./admin/Categories.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Login from "./admin/Login.jsx";
import ProductForm from "./admin/ProductForm.jsx";
import ProductsAdmin from "./admin/ProductsAdmin.jsx";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute.jsx";
import Register from "./admin/Register.jsx";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin" element={<ProtectedAdminRoute />}>
        <Route element={<AdminShell />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id/edit" element={<CategoryForm />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
