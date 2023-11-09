import s from './Paginator.module.css'

export const Paginator = ({ pages, currentPage, onChangePage }) => {
    return (
        <div className={s.pagination}>
            {pages.map((pageNum) => (
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
        </div>
    );
};