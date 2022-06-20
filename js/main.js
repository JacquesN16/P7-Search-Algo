import SearchBar from "./components/searchBar.js"
import TagList from './components/TagList.js';
import DropdownButton from './components/dropdownBtn.js';
import RecipeCard from "./components/recipeCards.js";
import recipesAPI from "./api.js"

let searchKey = '';


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
    
    const recipes = recipesAPI.getRecipes({
        utils: tagListUtilEl.selectedTags,
        ingredients: tagListIngredientEl.selectedTags,
        utensils: tagListUtensilEl.selectedTags,
        searchKey,
    });

    dropdownUtils.updateOptionList(recipesAPI.getUtils());
    dropdownButtonIngredients.updateOptionList(recipesAPI.getIngredients());
    dropdownUtensils.updateOptionList(recipesAPI.getUtensils());

    const recipeListSection = document.querySelector('#recipes-list');
    recipeListSection.innerHTML = ``;
    recipes.forEach((recipe) => {
        const recipeEl = new RecipeCard(recipe.name, recipe.time, recipe.ingredients, recipe.description);
        recipeListSection.appendChild(recipeEl.el);
    });
    const alertRecipe = document.querySelector('.card-alert');
    recipes.length === 0 ? (alertRecipe.style.display = 'block') : (alertRecipe.style.display = 'none');

};


const tagListIngredientEl = new TagList('primary', displayRecipeList);
const tagListUtilEl = new TagList('success', displayRecipeList);
const tagListUtensilEl = new TagList('danger', displayRecipeList);

const dropdownUtils = new DropdownButton(
    'Appareil',
    'success',
    recipesAPI.getUtils(),
    (item) => tagListUtilEl.addTag(item),
    (inputValue) => {
        const utils = recipesAPI.getUtils(inputValue);
        dropdownUtils.updateOptionList(utils);
    },
);

const dropdownUtensils = new DropdownButton(
    'Ustensiles',
    'danger',
    recipesAPI.getUtensils(),
    (item) => tagListUtensilEl.addTag(item),
    
    (inputValue) => {
        const utensils = recipesAPI.getUtensils(inputValue);
        dropdownUtensils.updateOptionList(utensils);
    },
);

const dropdownButtonIngredients = new DropdownButton(
    'Ingredients',
    'primary',
    recipesAPI.getIngredients(),
    (item) => tagListIngredientEl.addTag(item),
    (inputValue) => {
        const ingredients = recipesAPI.getIngredients(inputValue);
        dropdownButtonIngredients.updateOptionList(ingredients);
    },
);

const initFilterButtons = () => {
    const filterSection = document.querySelector('section.filter-tags');
    filterSection.appendChild(dropdownButtonIngredients.el);
    filterSection.appendChild(dropdownUtils.el);
    filterSection.appendChild(dropdownUtensils.el);
};

const initRecipeList = () => {
    const recipes = recipesAPI.getRecipes();
    displayRecipeList(recipes)
};

const initTagList = () => {
    const tagSectionEl = document.getElementById('selected-tags');
    tagSectionEl.appendChild(tagListIngredientEl.el);
    tagSectionEl.appendChild(tagListUtilEl.el);
    tagSectionEl.appendChild(tagListUtensilEl.el);
}

initFilterButtons()
displayRecipeList()
initSearchBar()
initRecipeList()
initTagList()