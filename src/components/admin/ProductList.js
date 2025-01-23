import React, { useState, useEffect } from "react";
import styles from "../../styles/ProductList.module.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("상품 목록 불러오기 오류:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>상품 로딩 중...</div>;
  }

  if (products.length === 0) {
    return <div className={styles.noProducts}>등록된 상품이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>상품 목록</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.pid} className={styles.card}>
            <div className={styles.imageContainer}>
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0].image_path} 
                  alt={product.name} 
                  className={styles.image}
                />
              ) : (
                <div className={styles.imagePlaceholder}>이미지 없음</div>
              )}
            </div>
            <div className={styles.details}>
              <h3 className={styles.name}>{product.name}</h3>
              <div className={styles.info}>
                <div className={styles.metadata}>
                  <span className={styles.brand}>브랜드: {product.brand}</span>
                  <span className={styles.category}>카테고리: {product.category_code}</span>
                  <span className={styles.price}>가격 : {product.price.toLocaleString()}원</span>
                </div>
              </div>
              <p className={styles.description}>
                {product.description || "설명 없음"}
              </p>
              <div className={styles.additionalInfo}>
                <span className={styles.createdAt}>
                  등록일: {new Date(product.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;