import icons from "url:../../img/icons.svg"; // Parcel 2

export default class View {
	//
	_data;

	_clear() {
    	this._parentElement.innerHTML = "";
    }

    //

    render(data) {
    	if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;

        const html = this._generateHTML();

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }

    update(data) {
    	// if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;

        const html = this._generateHTML();

        const newDOM = document.createRange().createContextualFragment(html); 
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));
        // console.log(curElements);
        // console.log(newElements);

        newElements.forEach((newElement, i) => {
        	const curElement = curElements[i];
        	// console.log(curElement, newElement.isEqualNode(curElement));

        	//Update changed TEXT
        	if (!newElement.isEqualNode(curElement) && newElement.firstChild?.nodeValue.trim() !== "") {
        		// console.log("🎇", newElement.firstChild.nodeValue.trim());
        		curElement.textContent = newElement.textContent;
        	}

        	//Update changedATTRIBUTES 
        	if (!newElement.isEqualNode(curElement)) {
        		// console.log(newElement.attributes);

        		console.log(Array.from(newElement.attributes));
        		Array.from(newElement.attributes).forEach(attr => {
        			curElement.setAttribute(attr.name, attr.value);
        		});
        	}
        });

    }

    renderSpinner() {
	    const spinnerMarkup = `
	                <div class="spinner">
	                    <svg>
	                        <use href="${icons}#icon-loader"></use>
	                    </svg>
	                </div>
	            `;
	    this._clear();
	    this._parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
	}

	renderError(message = this._errorMessage) {
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
        this._clear();
	    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
	}

	renderSuccess(message = this._successMessage) {
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
        this._clear();
	    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
	}
}