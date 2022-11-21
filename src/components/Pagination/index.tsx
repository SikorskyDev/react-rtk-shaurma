import React from "react";
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={3}
            forcePage={currentPage - 1}
        // renderOnZeroPageCount={null}
        />
    )
}

