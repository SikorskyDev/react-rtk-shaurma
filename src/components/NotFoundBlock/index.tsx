import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () =>  {
    return (
        <>
            <h1 className={styles.root}>
                Сторінку не знайдено...
            </h1>
            <div className={styles.description}>Дана сторінка відсутня на нашому сайті</div>
        </>
    )
}