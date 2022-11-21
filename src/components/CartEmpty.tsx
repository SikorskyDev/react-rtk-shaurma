import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пуста 😕</h2>
            <p>
                Ви ще не замовили шаурму.<br />
                Для замовлення перейдіть на головну сторінку.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Головна сторінка</span>
            </Link>
        </div>
    )
}

