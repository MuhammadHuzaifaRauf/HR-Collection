import React, { useState, useEffect } from "react";

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data );
  const [loading, setLoading] = useState(false);

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const responce = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await responce.clone().json());
        setFilter(await responce.json());
        setLoading(false);
        console.log(filter);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return <>Loading...</>;
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <div className="btn btn-outline-dark me-2">All</div>
          <div className="btn btn-outline-dark me-2">All Men's Clothing</div>
          <div className="btn btn-outline-dark me-2">Women Clothing</div>
          <div className="btn btn-outline-dark me-2">Shoes</div>
          <div className="btn btn-outline-dark me-2">Electronics</div>
        </div>

        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4" key={product.id}>
                  <img src={product.image} class="card-img-top" alt={product.title}
                  height="250px" />
                  <div class="card-body">
                    <h5 class="card-title mb-0">{product.title.substring(0,12)}</h5>
                    <p class="card-text lead fw-bolder">
                    ${product.price}
                    </p>
                    <a href="#" class="btn btn-outline-dark">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1
              className="display-6 fw-bolder
         text-center"
            >
              Latest Products
            </h1>
            <hr />
            <div className="row justify-content-center">
              {/* { loading ? <Loading /> : <ShowProducts />} */}
              {loading ? <Loading /> : <ShowProducts />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
