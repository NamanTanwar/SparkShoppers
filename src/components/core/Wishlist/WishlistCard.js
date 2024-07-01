import React from 'react';
import ProductImageCarousel from '../../common/ProductImageCarousel';
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../slices/wishlistSlice';
import { removeItemFromWishlist } from '../../../services/operations/wishlistAPI';
import { useNavigate,Link } from 'react-router-dom';

const WishlistCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { accessToken, isLoggedIn } = useSelector(state => state.auth);

  const {_id, images, name, brand, price, ratingAndReviews } = product;

  const removeFromWishlistHandler = (isLoggedIn) => {
    if (!isLoggedIn) {
      dispatch(removeFromWishlist(_id, accessToken));
    } else {
      dispatch(removeItemFromWishlist(_id, accessToken.token));
    }
  };

  return (
    <div className="relative shadow-md rounded-lg overflow-hidden p-4 flex flex-col gap-2 bg-white z-10">
      <button className="absolute top-2 right-2 hover:bg-gray-200 rounded-full p-1 z-50 focus:outline-none">
        <MdDeleteForever size="20" onClick={() => removeFromWishlistHandler(isLoggedIn)} />
      </button>
      <ProductImageCarousel images={images} />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <h4>{brand}</h4>
        <p className="text-gray-700">{price}</p>
      </div>
      <div className="flex justify-between mt-auto">
      <Link to={`/product/${_id}`}>
        <button className="btn btn-primary hover:bg-purple-500 hover:text-white focus:outline-none rounded-md p-3">Add To Cart</button>
        </Link> 
        <button className="btn btn-outline hover:bg-gray-200 focus:outline-none rounded-md p-3" onClick={()=>navigate(`/product/${_id}`)}>View Product</button>
      </div>
    </div>
  );
};

export default WishlistCard;
