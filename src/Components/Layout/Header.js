import React from "react";
import styles from "./Header.module.css";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header} >
            <div style={{textAlign:"center"}} >
                <FastfoodIcon fontSize="large" /><button className={styles.logo}>Zwiggy</button>
            </div>
            <div>
                <HeaderCartButton onCartClick={props.onCartClick} />
            </div>
        </header>

        <div className={styles['main-image']} >
            <img src="https://www.wallpaperflare.com/static/944/309/206/food-steak-wine-dessert-wallpaper.jpg" alt="food_image" />
        </div>
    </React.Fragment>
};

export default Header;