import React from "react";

type CategoriesProps = {
    categoryId: number;
    onChangeCategory: (i: number) => void;
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ onChangeCategory, categoryId }) => {

    const categories = ['Всі', "Телятина", 'Лосось', 'Курка', 'Баранина', 'Вегетаріанські']

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => {
                        return (
                            <li key={index.toString()} onClick={() => onChangeCategory(index)} className={categoryId === index ? "active" : ''} >{value}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
})
