import React from "react";
import debounce from 'lodash.debounce';
import styles from './Search.module.scss'
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";

export const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus();
    }

    //Завдяки useCallback зберегли ссилку на функцію і зробили відкладеною. Це неохідно було для того, щоб кожного разу не створювалась нова функція. Нова функція створювалась із-за того, шо компонент постійно перемальовувався із-за того, що змінювався стейт. 
    //?Пусті "[]" говорять про те, щоб ця функція створилсь при першому рендері і більше не перестворювалась.
    //!Без useCallback, при перемалюванні компонента, створюється нова функція яка викликається із затримкою в пів секунди.
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 500),
        [],
    )

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }


    return (
        <div className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" /></g></svg>
            <input className={styles.input} ref={inputRef} type="text" placeholder="Пошук ..." value={value} onChange={onChangeInput} />
            {
                value &&
                <svg className={styles.clearIcon} onClick={onClickClear} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" /><path d="M0 0h48v48h-48z" fill="none" /></svg>

            }
        </div>
    )
}