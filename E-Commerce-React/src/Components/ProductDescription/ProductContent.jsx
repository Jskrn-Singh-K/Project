import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import addWhishlist from '../../hooks/useWhishlist';
import { useState } from 'react';
const ProductContent = ({ value }) => {
    const [check,setCheck]=useState(false);
    console.log(value);
  return (
    <div className="flex flex-col gap-6 p-5">
      
      {/* Product Name and Wishlist Icon */}
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">{value?.name || 'Loading name...'}</span>
        <span onClick={()=>addWhishlist(value)&&setCheck(true)}>{check?<FavoriteBorderOutlinedIcon className="cursor-pointer" />:<FavoriteIcon/>}</span>
      </div>

      {/* Price */}
      <span className="text-lg font-medium">
        {value?.price ? `₹${value.price}` : 'Loading price...'}
      </span>

      {/* Available Colors */}
      <div>
        <p className="text-sm text-gray-600 mb-1">Color: {value?.color?.[0]}</p>
                <div className="flex gap-2 mt-2">
        {value?.color?.map((clr, idx) => (
            <div
            key={idx}
            className="w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: clr }}
            title={clr}
            ></div>
        ))}
        </div>
      </div>

      {/* Available Sizes */}
      <div>
        <p className="text-sm text-gray-600 mb-1">SELECT SIZE</p>
        <div className="flex gap-2">
          {value?.size?.map((s, i) => (
            <span key={i} className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100">
              {s}
            </span>
          )) || 'Loading sizes...'}
        </div>
      </div>

      {/* Size Guide */}
      <div className="text-right text-sm text-blue-500 cursor-pointer">
        SIZE GUIDE
      </div>

      {/* Add to Cart */}
      <div>
        <button className="w-full py-2 bg-black text-white rounded hover:opacity-90 transition">
          ADD TO CART
        </button>
      </div>

      {/* Store Pickup */}
      <div className="flex justify-between text-sm">
        <span>Free Pick up at:</span>
        <span className="text-blue-500 cursor-pointer">CHANGE STORE</span>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700">{value?.description || 'Loading description...'}</p>
      </div>

      {/* Material */}
      <div>
        <p className="text-sm text-gray-600">{value?.material?.join(', ') || ''}</p>
      </div>

      {/* Delivery (optional placeholder) */}
      <div className="text-sm text-gray-500 italic">Delivery details coming soon.</div>
    </div>
  );
};

export default ProductContent;
