import React, {useState} from 'react'
import ImageHelper from './helper/imageHelper';
import { Redirect } from "react-router-dom"
import { addItemToCart,removeItemFromCart } from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';

//TODO 



const Card = ({
    product,
    addtoCart = true,
    removeFromCart =false,
    reload = undefined,
    setReload = f=>f,
    reloadForAdd = undefined,
    setReloadForAdd =f=>f
}) => {

    const [redirect, setRedirect] = useState(false)
    const [redirectForCart,setRedirectForCart]=useState(false)
    const cartTitle = product?product.name:"A photo from pexels"
    const cartDescription = product?product.cartDescription:"A Good item"
    const cartPrice = product?product.price:"Default"

    const addToCart =() => {
      if (isAuthenticated()){
        addItemToCart(product, () =>setRedirect(true));
        console.log("added to cart");
        setReloadForAdd(!reloadForAdd);
      }
      else{
        setRedirectForCart(true);
      }
    }

    const getAredirect = redirect => {
      if(redirect) {
        return <Redirect to="/cart"/>
      }
    };

    const getAredirectForCart = redirectForCart=>{
      if(redirectForCart){
        return <Redirect to="/signin"/>
      }
    }

    const showAddToCart = addToCart => {
      return (
              addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
              )
      );
    };

    const showRemoveFromCart = removeFromCart => {
      return (
           removeFromCart && (
            <button
            onClick={() => {
              // TODO
              removeItemFromCart(product.id);
              setReload(!reload)
              console.log("product removed")
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
           )
      )

    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          {getAredirect(redirect)}
          {getAredirectForCart(redirectForCart)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
    <p className="btn btn-success rounded  btn-sm px-4">INR {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;
