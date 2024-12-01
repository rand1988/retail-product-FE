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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const response = await fetch(`http://localhost:9090/products/search?query=${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        setError("Unable to fetch products. Please try again.");
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {results.map((product) => (
              <li key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                <strong>{product.name}</strong> - {product.category} - $
                {product.price.toFixed(2)}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default SearchView;
