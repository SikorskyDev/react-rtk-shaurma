import React from "react";
import qs from 'qs';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import {Categories, SortPopup as Sort, GoodsBlock, Skeleton, Pagination} from '../components';

import { useAppDispatch, RootState } from '../redux/store';
import { selectGoods } from "../redux/goods/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchGoods } from "../redux/goods/asyncActions";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false)

    const { items, status } = useSelector(selectGoods);
    // const {categoryId, sortProperty: sort, currentPage} = useSelector(selectFilter);
    const categoryId = useSelector<RootState, number>(state => state.filter.categoryId);
    const sortProperty = useSelector<RootState, string>(state => state.filter.sort.sortProperty);
    const currentPage = useSelector<RootState, number>(state => state.filter.currentPage);
    const searchValue = useSelector<RootState, string>(state => state.filter.searchValue);


    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }
    const fetchItems = async () => {

        const sortBy = sortProperty.replace('-', '');
        const order = sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue;

        dispatch(
            fetchGoods({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage)
            }))
    }

    // 2 Если изменили параметры и был первый рендер
    //? Якщо не було першого рендеру, то не нада вшивати в адресну строку параметри
    // React.useEffect(() => {

    //     // Якщо isMounted буде true (тобто якщо був вже перший рендер), то тільки тоді необхідно виконувати дану дію
    //     if (isMounted.current) {
    //         const params = {
    //             categoryId: categoryId > 0 ? categoryId : null,
    //             sortProperty,
    //             currentPage
    //         }

    //         // За допомогою бібліотеки QS - функції stringify, перетворюю обєкт в одну цілу строку
    //         const queryString = qs.stringify(params, {skipNulls: true});

    //         // Вшиваємо створену строку в адрес
    //         navigate(`/?${queryString}`)
    //     }

    //     if (!window.location.search) {
    //         dispatch(fetchGoods({} as SearchGoodsParams))
    //     }

    //     // Після того як вже перший рендер був, то міняю
    //     isMounted.current = true;

    // }, [categoryId, sortProperty, currentPage, searchValue]);

    React.useEffect(() => {
        fetchItems();
    }, [categoryId, sortProperty, searchValue, currentPage])


    // 1 Если был первый рендер, то проверяем URl-параметры и сохраняем в редaксе
    //Перед парсінгом провіряємо чи є в нас в URL параметри. Провіряємо при першому рендері
    // React.useEffect(() => {
    //     if (window.location.search) {
    //         //якщо в нас в адресні строці шось є, то ми будеом це парсити (із наших параметрів, які є і перетворювати в ОБ'ЄКТ)
    //         //Парсимо за допомогою QS
    //         //! В qs.parse не можна передавати знак питання. За допомогою substring() забираємо його. Знак питання перший, тому в substring(1) передаємо '1', тобто забираємо перший символ
    //         //? ось цю строку "?sortProperty=rating&categoryId=0&currentPage=1" перетворили в обєкт {sortProperty: 'rating', categoryId: '0', currentPage: '1'}. Такі ж ключі є в initialStat. Потом будемо їх міняти.
    //         //?при рендері params = {sortProperty: '-price', categoryId: '0', currentPage: '1'}
    //         const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchGoodsParams;


    //         //! LIST експортували із Sort.jsx
    //         //Шукаємо в list те шо є в params і цей обєкт передаємо в dispatch(setFilters())
    //         //?при рендері sort = {name: 'ціні (ASC)', sortProperty: '-price'}
    //         const sort = list.find((obj) => obj.sortProperty === params.sortBy)

    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId: Number(params.category),
    //             currentPage: Number(params.currentPage),
    //             sort: sort ? sort : list[0],
    //         }));


    //         //Передаємо спарсені властивості в РЕДАКС
    //         // dispatch(setFilters({
    //         //     //sortProperty передається як строка
    //         //     ...params,
    //         //     sort
    //         // }));

    //         //! Тепер, після того як ми наприклад в категоріях виберемо "Гриль" і сортування виставимо по ціні, то після перезавантаження сторінки вибране сортування і катиегорії зберігаються. Зберігаються тому, що в РЕДАКС "вшивається" шлях із URL.

    //         // Якщо перезавантажити сторінку, то видно, що спочатку робиться один запин на сервер і вже потом інший із параметрами URL із редаксу. Все ізза того, шо useEffect спочатку зробить одни запит, щоб отримати інформацію, а після того як залежності зміняться, то зробить ще один запит.

    //         // Якщо діспатчу на зімну фільтрів не було setFilters(), то isSearch.current буде false
    //         isSearch.current = true;
    //     }
    //     isMounted.current = true
    // }, []);


    // Если был первый рендер, то запрашиваем товар
    // React.useEffect(() => {

    //     //Якщо я роблю пошук із URL, то не нада нічого відправляти, тому що необхідно дочекатись коли прийде діспатч setFilters(). При першому рендері робимо перевірку: чи потрібно відправляти запит. Якщо прийшли якісь параметри, то запит не потрібно відправляти, нада зачекати поки діспатч виконається і він вже змусить даний useEffect() перемалюватись і отримати нову інформацію. Якщо цих параметрів (const params, const sort) не буде, то діспатч не відправиться і перемалювання не буде і другого запиту не буде.
    //     //! Для виконання створюю const isSearch(false)

    //     //Якщо щяс немає пошуку
    //     if (!isSearch.current) {
    //         fetchItems();
    //     }
    //     isSearch.current = false;

    //     // window.scrollTo(0, 0);
    // }, [currentPage, searchValue, sortProperty, categoryId])


    const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
    const goods = items.map((obj: any) => {
        return (

            <GoodsBlock
                key={obj.id}
                // Всі властивості автоматично розкриваються завдяки спред оператору
                {...obj}
            />

        )
    })


    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Перелік наявних товарів:</h2>
                {
                    status === 'error' ? (
                        <div className="content__error-info">
                            <h2>Виникла помилка</h2>
                            <p>Не вдала спроба отримати перелік товарів. Повторіть спробу пізніше.</p>
                        </div>
                    ) : (
                        <div className="content__items"> {status === 'loading' ? skeleton : goods}</div>
                    )
                }
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </>
    )
}

export default Home