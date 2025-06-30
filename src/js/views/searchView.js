//
class SearchView {
	#parentElement = document.querySelector('.search');
	//
	#clearSearchInput() {
		this.#parentElement.querySelector(".search__field").value = "";
	}

	getQuery() {
		const query = this.#parentElement.querySelector(".search__field").value;
		this.#clearSearchInput();
		return query;
	}

	addHandlerSearch(handler) {
		this.#parentElement.addEventListener("submit", function(event) {
			event.preventDefault();
			handler();
		});
	}
}

export default new SearchView();