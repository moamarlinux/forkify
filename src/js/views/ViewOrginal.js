//
import icons from "url:../../img/icons.svg"; // Parcel 2

export default class View {
	//
	#data;

	#clear() {
    	this.#parentElement.innerHTML = "";
    }

    render(data) {
        this.#data = data;

        const recipeMarkup = this.#generateMarkupRecipe();
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", recipeMarkup);
    }

    renderSpinner() {
	    const spinnerMarkup = `
	                <div class="spinner">
	                    <svg>
	                        <use href="${icons}#icon-loader"></use>
	                    </svg>
	                </div>
	            `;
	    this.#clear();
	    this.#parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
	}

	renderError(message = this.#errorMessage) {
		const errorMarkup = `
			<div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this.#clear();
	    this.#parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
	}

	renderSuccess(message = this.#successMessage) {
		const errorMarkup = `
			<div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this.#clear();
	    this.#parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
	}
}