import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function FullGoods() {
    const [goods, setGoods] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
        description: string
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchGoods() {
            try {
                const { data } = await axios.get(
                    "https://63550e47da523ceadcf97b37.mockapi.io/items/" + id
                );
                setGoods(data);
            } catch (error) {
                alert("Помилка при отриманні товару");

                //! Якщо в адресній строці вказаний шлях на товар, якого не існує, то перекине на головну сторінку "/"
                navigate("/");
            }
        }
        fetchGoods();
    }, [id]);

    if (!goods) {
        return <h2>Завантаження...</h2>;
    }

    return (
        <div className="container foolGoods">
            <img src={`${process.env.PUBLIC_URL}/${goods.imageUrl}`} className="foolGoods__img" />
            <h2 className="foolGoods__title">{goods.title}</h2>
            <p className="foolGoods__desc">{goods.description}</p>
            <h4 className="foolGoods__price">{goods.price} грн.</h4>
            
            <Link
                to="/"
                className="button button--outline button--add go-back-btn foolGoods__btn"
            >
                <span>Назад</span>
            </Link>
        </div>
    );
}
