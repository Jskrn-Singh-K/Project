import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductImage from "../Components/ProductDescription/ProductImage"
import ProductContent from "../Components/ProductDescription/ProductContent";
import SimilarProducts from "../Components/SimilarProducts";
import FeaturedProduct from "../Components/FeaturedProduct";
function ProductDiscription(){
    const [value, setValue] = useState();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/products/${id}`);
                setValue(res.data.data.product);
            
                // console.log(value);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchProduct();
    }, [id]);
    const category = value?.category;
    const subCategory = value?.subCategory;
    console.log(category,subCategory);
    
    return (
            <div className="grid grid-cols-2 ">
                
                <div className="p-6">
                <ProductImage product={value}/>
            </div>
            <div>
                <ProductContent value={value}/>
                </div>
                <div className="col-span-2">
                    <SimilarProducts category={category} subCategory={subCategory} />
                </div>
                <div className="col-span-2">
                    <FeaturedProduct category={category}/>
                </div>
            </div>
    );
}

export default ProductDiscription;
