import { FC, useState } from "react";
import s from "./Paginator.module.css";

type PropsType = {
    totalItemsCount: number,
    perPage: number,
    currentPage: number,
    onChangePage: (pageNum: number) => void,
    portionSize: number,
}
export const Paginator: FC<PropsType> = ({
    totalItemsCount,
    perPage,
    currentPage,
    onChangePage,
    portionSize = 5,
}) => {
    // Вычитаем одного из totalItemsCount, потому что себя не считаем
    const pagesCount = Math.ceil(totalItemsCount / perPage);
    const pages = [] as number[];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // Устанавливаем количество порций(под порцией понимаем некоторое количество страниц, которое мы отображаем в текущий момент)
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);

    // Вычисляем левую и правую границу
    // portionNumber - то же самое, что и currentPage, текущий номер порции
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    // Потом Фильтруем массив из всех страниц, отображаем только те страницы, которые должны быть в конкретной порции 

    return (
        <div className={s.pagination}>
            {portionNumber > 1 && (
                <button
                    onClick={() => setPortionNumber(portionNumber - 1)}
                    className={s.arrow}
                >
                    <img src="./img/icons/arrow_left.svg" alt="left arrow" />
                </button>
            )}

            {pages
                .filter(
                    (p) =>
                        p >= leftPortionPageNumber &&
                        p <= rightPortionPageNumber
                )
                .map((pageNum) => (
                    <button
                        className={
                            currentPage === pageNum
                                ? `${s.selectedPage} ${s.pageBtn}`
                                : s.pageBtn
                        }
                        key={pageNum}
                        onClick={() => {
                            onChangePage(pageNum);
                        }}
                    >
                        {pageNum}
                    </button>
                ))}

            {portionCount > portionNumber && (
                <button
                    onClick={() => setPortionNumber(portionNumber + 1)}
                    className={s.arrow}
                >
                    <img src="./img/icons/arrow_right.svg" alt="right arrow" />
                </button>
            )}
        </div>
    );
};
