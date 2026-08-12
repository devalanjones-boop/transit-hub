import { ChevronLeft, ChevronRight } from "lucide-react"


const Pagination = ({

    currentPage,
    totalPages,
    onPageChange,
}) => {

    if (totalPages <= 1) {

        return null
    }

    let pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    return (

        <div className="flex items-center justify-center gap-2 mt-6">

            {/* Previous */}
            <button
                type="button"
                aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg border ${currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                type="button"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight size={18} />
            </button>

        </div>

    )
}

export default Pagination