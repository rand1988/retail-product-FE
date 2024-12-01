import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9090/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
      <div>
        <h1>{product.name}</h1>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <img src={product.imageUrl} alt={product.name} />
      </div>
  );
};

export default ProductDetail;
