import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";

import { MODAL_CLOSE_SEC } from "./config"; 


import "core-js/stable";
import "regenerator-runtime/runtime";

// if (module.hot) {
//     module.hot.accept();
// }


const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        // console.log(id);

        if (!id) return;

        recipeView.renderSpinner();

        //0) Update results view to mark selected search result 
        resultsView.update(model.getSearchResultsOfPage());

        //1) Update bookmarks
        bookmarksView.update(model.state.bookmarks);

        // 2) Loading recipe
        await model.loadRecipe(id);

        // 3) Rendering recipe
        recipeView.render(model.state.recipe);

        //TEST only
        // controlServings();
        
    } catch (error) {
        // console.error(error);
        // alert(error);
        // recipeView.renderError(`${error} 🎇 🎇 🎇 🎇 🎇 🎇 🎇`);
        recipeView.renderError();
        console.error(error);
    }
};

// showRecipe();

const controlSearchResults = async function() {
    try {
        //Get query
        const query = searchView.getQuery();
        if (!query) return;

        resultsView.renderSpinner();
        // console.log(resultsView);

        //Load search results
        await model.loadSearchResults(query);
        console.log(model.state.search.results);

        //Render results
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsOfPage()); 

        //Render initial pagination buttons
        paginationView.render(model.state.search);
        //
    } catch(error) {
        console.error(error);
    }
};
// controlSearchResults();

const controlPagination = function(goToPage) {
    //
    console.log(goToPage);

    //Render NEW results
    resultsView.render(model.getSearchResultsOfPage(goToPage)); 

    //Render NEW pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
    //Update the recipe servings (in state) 
    model.updateServings(newServings);

    //Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
    //1) Add or remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.removeBookmark(model.state.recipe.id);

    console.log(model.state.recipe);

    //2) Update recipe view
    recipeView.update(model.state.recipe);

    //3) Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
    try {
        //Show loading spinner 
        addRecipeView.renderSpinner();

        console.log(newRecipe);
    
        //Upload the new recipe data
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        //Render recipe
        recipeView.render(model.state.recipe); 

        //Success message
        addRecipeView.renderSuccess();

        //Re Render bookmarks view
        bookmarksView.render(model.state.bookmarks);

        //Change ID in URL 
        window.history.pushState(null, "", `#${model.state.recipe.id}`);

        //Close form of add recipe
        setTimeout(function() {
            addRecipeView.toggleHidden();
        }, MODAL_CLOSE_SEC * 1000);

    } catch(error) {
        console.error("🎇", error);
        addRecipeView.renderError(error.message);
    }
}

const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerOfClick(controlPagination);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerOfAddBookmark(controlAddBookmark);
    addRecipeView.addHandlerUpload(controlAddRecipe); 
    console.log("Welcome");
};

init();