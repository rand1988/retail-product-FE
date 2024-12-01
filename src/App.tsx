import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./components/SearchView";
import ProductDetail from "./components/ProductDetails";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SearchView />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
  );
}

export default App;
