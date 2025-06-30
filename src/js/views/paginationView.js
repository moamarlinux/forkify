//
import View from "./View";

import icons from "url:../../img/icons.svg"; // Parcel 2

class PaginationView extends View {
	//
	_parentElement = document.querySelector('.pagination');

	_generateHTML() {
		//
		const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
		console.log(numOfPages);

		const currentPage = this._data.page;
		//
		// Page 1 and there are other pages
		if (currentPage === 1 && numOfPages > 1) {
			return `
				<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
			`;
		} 

		// Last page 
		if (currentPage === numOfPages && numOfPages > 1) {
			return `
				<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
			`;
		}

		// Other page
		if (currentPage < numOfPages) {
			return `
				<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
			`;
		}

		// One page only 
		return "";
	}

	addHandlerOfClick(handler) {
		this._parentElement.addEventListener("click", function(event) {
			const btn = event.target.closest(".btn--inline");
			if (!btn) return;
			// console.log(btn);

			const goToPage = +btn.dataset.goto;
			// console.log(goToPage);

			handler(goToPage);
		});
	}
}

export default new PaginationView();