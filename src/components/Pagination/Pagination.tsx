import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  return (
    <div className={className}>
      <nav aria-label="Pagination">
        <ReactPaginate
          pageCount={totalPages}
          forcePage={currentPage - 1}
          onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
          containerClassName={css.pagination}
          activeClassName={css.active}
          disabledClassName={css.disabled}
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </nav>
    </div>
  );
};

export default Pagination;
