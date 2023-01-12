import React, { useContext, useState } from "react";
import styles from "./Cart.module.css"
import Modal from "../UI/Modal";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckingOut, setisCheckingOut] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);
    const cxt = useContext(CartContext);
    const totalAmount = `₹${cxt.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = id => {
        cxt.removeItem(id)
    };
    const cartItemAddHandler = item => {
        cxt.addItem({ ...item, amount: 1 })
    };

    const orderHandler = () => {
        setisCheckingOut(true);
    };

    const submitOrderHandler = async (userData) => {
        setisSubmitting(true);
        await fetch('https://zwiggy-dc710-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cxt.items
            })
        });
        setisSubmitting(false);
        setdidSubmit(true);
        cxt.clearCart();
    };

    const cartitems = (
        <ul className={styles['cart-items']}>
            {cxt.items.map((item) => (<CartItem key={item.id}
                name={item.name} amount={item.amount}
                price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)} >
                {item.name}
            </CartItem>
            ))}
        </ul>
    );
    const hasItems = cxt.items.length > 0;

    const cartModalContent =
        <React.Fragment>
            {cartitems}
            <div className={styles.total} >
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckingOut && <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose} >Close</button>
                {hasItems && <  button className={styles.button} onClick={orderHandler} >Order</button>}
            </div>}
        </React.Fragment>

    const isSubmittingModal = <p>Sending order data.</p>

    const didSubmitModal =
        <React.Fragment>
            <p>Successfully sent the order.</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose} >Close</button>
            </div>
        </React.Fragment>
    return <Modal onClose={props.onClose} >
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModal}
        {!isSubmitting && didSubmit && didSubmitModal}
    </Modal>

}

export default Cart;