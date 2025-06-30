//
import View from "./View";

import icons from "url:../../img/icons.svg"; // Parcel 2


class BookmarksView extends View {
	//
	_parentElement = document.querySelector('.bookmarks__list'); 
	_errorMessage = "No bookmarks yet, find a nice recipe and bookmark it ;)"; 
	_successMessage = ""; 
	//

	_generateBookmarkHTML(bookmark) {
		const id = window.location.hash.slice(1);

		return `
			<li class="preview">
                <a class="preview__link ${bookmark.id === id ? "preview__link--active" : ""}" href="#${bookmark.id}">
                    <figure class="preview__fig">
                        <img src="${bookmark.image}" alt="${bookmark.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${bookmark.title}</h4>
                        <p class="preview__publisher">${bookmark.publisher}</p>
                        <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
		`;
	}

	_generateHTML() {
		console.log(this._data);
		return this._data.map(bookmark => this._generateBookmarkHTML(bookmark)).join("");
		//
	}

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}
}

export default new BookmarksView();