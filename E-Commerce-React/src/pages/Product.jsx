import ProductDiscription from "./ProductDescription";
import SimilarProducts from "../Components/SimilarProducts";

function Product(){
    return(
        <div>
           <div className="grid grid-cols-2"> 
            
            <div className="images">
                <div>
                    <ul className="grid grid-cols-2 grid-rows-11">
                        <li className="col-span-2 row-span-3">
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>
                        </li>
                        <li>
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>

                        </li>
                        <li>
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>

                        </li>
                        <li className="col-span-2 row-span-3">
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>

                        </li>
                        <li>
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>

                        </li>
                        <li>
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>

                        </li>
                        <li className="col-span-2 row-span-3">
                        <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>

                        </li>
                    </ul>
                </div>
            </div>
            <div className="">
                <div>
                    <ProductDiscription/>
                </div>
            </div>
            
            </div>
            <div>
                <SimilarProducts/>
            </div>
        </div>
    )
}

export default Product;