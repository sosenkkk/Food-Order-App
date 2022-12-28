import { ShoppingCart } from "@mui/icons-material";
import classes from "./HeaderCartButton.module.css"
import {useEffect, useContext, useState } from "react";
import CartContext from "../Store/cart-context";

const HeaderCartButton = (props) => {
    const [buttonBump, setButtonBump]=useState(false);
    const cxt= useContext(CartContext);
    const {items}= cxt;
    const numberOfItems= items.reduce((curNumber, item)=>{
        return curNumber+ item.amount;
    },0);

   

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setButtonBump(true);
        const timer=setTimeout(()=>{
            setButtonBump(false);
        }, 300);

        return ()=>{
            clearTimeout(timer);
        }

    },[items]);

    const buttonClasses=`${classes.button} ${buttonBump ? classes.bump : ''}`

    return <button className={buttonClasses} onClick={props.onCartClick} >
        <span className={classes.icon} >
            <ShoppingCart/>
        </span>
        <span >{numberOfItems}</span>
        <span  className={classes.badge} >{cxt.items.length}</span>

    </button>

}

export default HeaderCartButton;