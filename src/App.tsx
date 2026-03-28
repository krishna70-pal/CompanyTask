import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import TrackOrder from './pages/TrackOrder';
import InfoPage from './pages/InfoPage';
import About from './pages/About';
import FAQPage from './pages/FAQPage';
import AIChatBot from './components/AIChatBot';

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/info/faq" element={<FAQPage />} />
                <Route path="/info/:pageId" element={<InfoPage />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
            <AIChatBot />
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

