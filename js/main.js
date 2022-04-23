
import SearchBar from "./components/searchBar.js"
import recipesAPI from "./api.js"

const initSearchBar = () => {
    const searchSection = document.querySelector('section#search-input')
    const searchBar = new SearchBar(
        'Rechercher un ingrédient, appareil, ustensiles ou une recette',
        (inputValue) => {
            inputValue = inputValue.trim()
            if (!!inputValue && inputValue.length >= 3) searchKey = inputValue;
            else searchKey = ''

            displayRecipeList()
        },
    )
    searchSection.appendChild(searchBar.el)
}

const displayRecipeList = () => {
    const allRecipes = recipesAPI.getAllRecipes()

    console.log(allRecipes)
};



displayRecipeList()
initSearchBar()