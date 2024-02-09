import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import Star from "./Star";


const Product = (curElem) => {

  const { id, name, image, price, category, stars, reviews } = curElem;

  
 
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          <img src={image} alt={name} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{<FormatPrice price={price}/>}</p>
          </div>
          <div className="grid">
            {/* <h3><FormatPrice price={price} /> </h3>
            <p><del><FormatPrice price={price+2500} /></del></p> */}
            <Star stars={stars} reviews={reviews} />
            <p>{stars}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;