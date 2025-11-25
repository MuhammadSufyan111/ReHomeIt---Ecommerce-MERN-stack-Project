import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import SellPage from "./components/BecomeSeller";
import SellerDashboard from "./components/SellerDashboard";
import Cart from "./components/cart";
import Orders from "./components/order";
import AdminDashboard from "./components/admindashboard";
import DisplayProducts from "./components/displayproducts";
import SearchResults from "./components/SearchResults";
import MainLayout from "./components/MainLayout";
import ProductDetails from "./components/productdetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/" element={ <MainLayout> <Home /> </MainLayout> }
        />
        
        <Route
          path="/become-seller" element={ <MainLayout> <SellPage /> </MainLayout> }
        />

        <Route
          path="/seller/dashboard" element={ <MainLayout> <SellerDashboard /> </MainLayout> }
        />

        <Route
          path="/cart" element={ <MainLayout> <Cart  /></MainLayout>}
        />

        <Route
          path="/my-orders" element={<MainLayout> <Orders /></MainLayout>}
        />

        <Route
          path="/admin/dashboard"element={<MainLayout> <AdminDashboard /></MainLayout>}
        />

        <Route
          path="/products/:categoryName" element={ <MainLayout> <DisplayProducts /></MainLayout> }
        />

        <Route
          path="/product/:id" element={ <MainLayout> <ProductDetails /> </MainLayout> }
        />

        <Route
          path="/search" element={ <MainLayout> <SearchResults /> </MainLayout> }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
