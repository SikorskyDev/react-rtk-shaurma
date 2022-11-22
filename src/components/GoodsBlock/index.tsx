import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemById } from "../../redux/cart/selectors";
import { CartItem as CartItemType } from "../../redux/cart/types";
import { addItem } from "../../redux/cart/slice";

const typesName = ["не гостра", "гостра"];

type GoodsBlockProps = {
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    id: string;
    rating: number;
};

export const GoodsBlock: React.FC<GoodsBlockProps> = ({
    title,
    price,
    imageUrl,
    types,
    id,
}) => {
    const [activeType, setActiveType] = useState(0);
    const dispatch = useDispatch();
    const cartItem = useSelector(
        selectCartItemById(activeType === 0 ? `${id}ng` : `${id}g`)
    );

    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item: CartItemType = {
            id: activeType === 0 ? `${id}ng` : `${id}g`,
            title,
            price,
            imageUrl,
            type: typesName[activeType],
            count: 0,
        };
        dispatch(addItem(item));
    };

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link key={id} to={`/goods/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={`${process.env.PUBLIC_URL}/${imageUrl}`}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((value, index) => {
                            return (
                                <li
                                    key={index.toString()}
                                    className={
                                        activeType === index ? "active" : ""
                                    }
                                    onClick={() => setActiveType(index)}
                                >
                                    {typesName[value]}
                                </li>
                            );
                        })}
                    </ul>
                    {/* <ul>
                        {sizes.map((value, index) => {
                            return (
                                <li
                                    key={index.toString()}
                                    className={
                                        activeSize === index ? "active" : ""
                                    }
                                    onClick={() => setActiveSize(index)}
                                >
                                    {value} см.
                                </li>
                            );
                        })}
                    </ul> */}
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price} ₴</div>
                    <div
                        className="button button--outline button--add"
                        onClick={onClickAdd}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавити</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </div>
                </div>
            </div>
        </div>
    );
};
