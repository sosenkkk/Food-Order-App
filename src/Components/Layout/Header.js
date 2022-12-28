import React from "react";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header} >
            <h1>Zwiggy</h1>
            <HeaderCartButton onCartClick={props.onCartClick} />
        </header>
        <div className={styles['main-image']} > 
            <img src="https://www.wallpaperflare.com/static/944/309/206/food-steak-wine-dessert-wallpaper.jpg" alt="food_image" />
        </div>
    </React.Fragment>
};

export default Header;