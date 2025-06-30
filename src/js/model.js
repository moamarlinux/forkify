//
import { API_URL, KEY, RES_PER_PAGE } from "./config";
import { JSONofAJAX } from "./helpers";

//
export const state = {
    recipe: {
        //
    },
    search: {
    	query: "",
    	results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
};

const createRecipeObject = function(data) {
    //
    let { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    };
};

export const loadRecipe = async function(id) {
    //
    try {
        const data = await JSONofAJAX(`${API_URL}/${id}?key=${KEY}`);

        // console.log(promise, data);

        // let { recipe } = data.data;

        // state.recipe = {
        //     id: recipe.id,
        //     title: recipe.title,
        //     publisher: recipe.publisher,
        //     sourceUrl: recipe.source_url,
        //     image: recipe.image_url,
        //     servings: recipe.servings,
        //     cookingTime: recipe.cooking_time,
        //     ingredients: recipe.ingredients
        // };
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true; 
        else state.recipe.bookmarked = false;
        // console.log(state.recipe);
    } catch (error) {
    	// Temp error handling
        console.error(`${error} 🎇 🎇 🎇 🎇 🎇`);
        throw error;
    }
};


export const loadSearchResults = async function(query) {
	//
	try {
		state.search.query = query;

		const data = await JSONofAJAX(`${API_URL}?search=${query}&key=${KEY}`);
		console.log(data);

		state.search.results = data.data.recipes.map(recipe => {
			return {
				id: recipe.id,
	            title: recipe.title,
	            publisher: recipe.publisher,
	            image: recipe.image_url,
                ...(recipe.key && { key: recipe.key })
			};
		});

        state.search.page = 1;
		// console.log(state.search.results);
		//
	} catch(error) {
		console.error(`${error} 🎇 🎇 🎇 🎇 🎇`);
        throw error;
	}
};

// loadSearchResults("pizza");

export const getSearchResultsOfPage = function(page = state.search.page) {
    //
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end); 
};

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        //oS2  oQ4
        //nS4  nQ 
        //newQt = oldQt * newServings / oldServings;//4 * 4 / 2 = 8
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function(recipe) {
    //Add a bookmark 
    state.bookmarks.push(recipe);

    //Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; 

    persistBookmarks();
};

export const removeBookmark = function(id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    //Mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false; 

    persistBookmarks();
};

export const uploadRecipe = async function(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
            .map(ing => {
                // const ingArr = ing[1].replaceAll(" ", "").split(",");
                const ingArr = ing[1].split(",").map(el => el.trim());
                if (ingArr.length !== 3) throw new Error("Wrong ingredient format, please enter ingredient in correct format");
                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description };
            });

        // console.log(ingredients);

        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            servings: +newRecipe.servings,
            cooking_time: +newRecipe.cookingTime,
            ingredients
        };

        // console.log(recipe);

        const dataRecipe = await JSONofAJAX(`${API_URL}?key=${KEY}`, recipe);
        console.log(dataRecipe);
        state.recipe = createRecipeObject(dataRecipe);
        addBookmark(state.recipe);
        //
    } catch (error) {
        throw error;
    }

};

const init = function() {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) state.bookmarks = JSON.parse(storedBookmarks);
};

init();
// console.log(state.bookmarks);

const clearBookmarks = function() {
    localStorage.clear("bookmarks");
};

// clearBookmarks();