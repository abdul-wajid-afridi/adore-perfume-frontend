import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

type PaginationProps = {
  page?: string;
  totalPages: number;
  hasNextPage: boolean;
};

export const Pagination = (props: PaginationProps) => {
  const { page = 1, totalPages, hasNextPage } = props;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = props.totalPages;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pages = getPagesToShow();

  return (
    <div className="flex items-center justify-center space-x-6 text-black my-10">
      <Link
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          currentPage === 1 ? "pointer-events-none bg-gray-100" : ""
        )}
        to={`?page=${currentPage - 1}`}
      >
        Previous
      </Link>

      <nav
        aria-label="Pagination"
        className="relative z-0 inline-flex -space-x-px rounded-md"
      >
        {pages.map((p, i) => (
          <Link
            key={p}
            className={cn(
              "relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50",
              p === currentPage ? "pointer-events-none bg-secondary" : "",
              i === 0 ? "rounded-l-md" : "",
              i === pages.length - 1 ? "rounded-r-md" : ""
            )}
            to={`?page=${p}`}
          >
            {p}
          </Link>
        ))}
      </nav>

      {Number(props.page) !== props.totalPages && (
        <Link
          className={cn(
            "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
            !hasNextPage ? "pointer-events-none bg-gray-100" : ""
          )}
          to={`?page=${currentPage + 1}`}
        >
          Next
        </Link>
      )}
    </div>
  );
};
