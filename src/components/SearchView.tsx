import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const SearchView: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/products/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
      <div>
        <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        <ul>
          {results.map((product) => (
              <li key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                <strong>{product.name}</strong> - {product.category} - ${product.price.toFixed(2)}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default SearchView;