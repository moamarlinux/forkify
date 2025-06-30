import View from "./View";

import icons from "url:../../img/icons.svg"; // Parcel 2


class AddRecipeView extends View {
	//
	_parentElement = document.querySelector(".upload");
	_recipeWindow = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnAddRecipe = document.querySelector(".nav__btn--add-recipe");
	_btnCloseRecipe = document.querySelector(".btn--close-modal");
	_successMessage = "Recipe was successfully uploaded";

	constructor() {
		super();
		this._addHandlerShowAddRecipe();
		this._addHandlerCloseAddRecipe();
	}

	toggleHidden() {
		this._recipeWindow.classList.toggle("hidden");
		this._overlay.classList.toggle("hidden");
	}

	_addHandlerShowAddRecipe() {
		this._btnAddRecipe.addEventListener("click", this.toggleHidden.bind(this));
	}

	_addHandlerCloseAddRecipe() {
		this._btnCloseRecipe.addEventListener("click", this.toggleHidden.bind(this));
		this._overlay.addEventListener("click", this.toggleHidden.bind(this));
	}

	addHandlerUpload(handler) {
		this._parentElement.addEventListener("submit", function(event) {
			event.preventDefault();
			const formDataArray = [...new FormData(this)];
			const formData = Object.fromEntries(formDataArray);
			handler(formData);
		});
	}
}

export default new AddRecipeView();