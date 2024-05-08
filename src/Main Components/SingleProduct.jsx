import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Container } from '../Styles/Container';
import { useParams } from 'react-router-dom'
import { useProductContext } from '../Context/Context';
import PageNavigation from '../Components/PageNavigation';
import MyImage from '../Components/MyImage';
import AddtoCart from '../Components/AddtoCart';
import Stars from '../Components/Stars';
import { FormatPrice } from '../Helpers/FormatPrice';
import { TbTruckDelivery, TbReplace  } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";

const API = "https://api.pujakaitem.com/api/products";

function SingleProduct() {
  const {id} = useParams();
  const { getsingleProduct, isSingleLoading, singleProduct } = useProductContext();

  const {
    name,
    company,
    price,
    description,
    stock,
    reviews,
    stars,
    image
  } = singleProduct;

  useEffect(()=>{
    getsingleProduct(`${API}?id=${id}`);
  },[id])

  if (isSingleLoading) {
    return <h2 className='loaderClass' > Loading... </h2>;
  }

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two--column">
          {/* product image  */}
          <div className="product_images">
            <MyImage imgs={image} />
          </div>
          {/* Product data  */}
          <div className="product-data">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <p className='product-data-price'>
              MRP: <del>{<FormatPrice price={price + 250000} />}</del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the day : <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            {/* services icons  */}
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className='warranty-icon' />
                <p>Free Delivery</p>
              </div>
              <div className="product-warranty-data">
                <TbReplace className='warranty-icon' />
                <p>30 Days Replacement</p>
              </div>
              <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>Patil Delivered </p>
              </div>
              <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p> Availability : <span style={{color: stock > 0 ? "green" : "red"}}>{stock > 0 ? "In Stock" : "Out of Stock"}</span> </p>
            </div>

            <p>Brand : {company}</p>
            <hr />
            {stock > 0 && <AddtoCart product={singleProduct} />}

          </div>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;

    .grid-two--column{
      grid-template-columns: 2fr 1.2fr;
    }
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: 500;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.media.mobile}){
    .grid-two--column{
      grid-template-columns: 1fr !important;
    }
  }
`;

export default SingleProduct