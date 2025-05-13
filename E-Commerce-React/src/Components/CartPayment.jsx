import { Button } from "@mui/material";

function CartPayment({cart}){
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    return(
    <div className="flex flex-col gap-7">
        
        <div >
                <span>DISCOUNT</span>
                <span className="float-right">ADD</span>
            </div>
            <div>
                <span>TOTAL</span>
                <span className="float-right">${total}</span>
            </div>
            <div>
                <Button>CONTINUE TO CHECKOUT</Button>
            </div>
            <div>
                <Button>SIGN IN</Button>
            </div>
        <div>
            <p>
            Prices and shipping costs are not confirmed until you have reached checkout.
            </p>
            <p>
            30-day returns. Read more about our <span>return and refund policy.</span>
            </p>
            <p>
            Need help? Please contact <span>Customer Support</span>
            </p>
            <p>
            Delivery and return options
            </p>
            </div>
               
        
    </div>)
}
export default CartPayment;