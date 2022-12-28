import { useContext } from "react";
import styles from "./Cart.module.css"
import Modal from "../UI/Modal";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const cxt = useContext(CartContext);
    const totalAmount = `$${cxt.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = id => {
        cxt.removeItem(id)
    };
    const cartItemAddHandler = item => {
        cxt.addItem({...item, amount:1})
    };

    const cartitems = (
        <ul className={styles['cart-items']}>
            {cxt.items.map((item) => (<CartItem key={item.id}
                name={item.name} amount={item.amount}
                price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null ,item)} >
                {item.name}
            </CartItem>
            ))}
        </ul>
    );
    const hasItems = cxt.items.length > 0;
    return <Modal onClose={props.onClose} >
        {cartitems}
        <div className={styles.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose} >Close</button>
            {hasItems && <  button className={styles.button} >Order</button>}
        </div>
    </Modal>

}

export default Cart;