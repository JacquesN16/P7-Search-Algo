const searchOnRecipes = (searchingList, searchKey) => {
    const filteredRecipes = [];
    
    searchKey = searchKey.toLowerCase();
    for (let i = 0; i < searchingList.length; i++) {
        const recipe = searchingList[i];
        if (isSearchWordExist(recipe.name, searchKey)) {
            filteredRecipes.push(recipe);
        } else if (isSearchWordExist(recipe.description, searchKey)) {
            filteredRecipes.push(recipe);
        } else {
            for (let y = 0; y < recipe.ingredients.length; y++) {
                const ingredient = recipe.ingredients[y];
                if (isSearchWordExist(ingredient.ingredient, searchKey)) {
                    filteredRecipes.push(recipe);
                    break;
                }
            }
        }
    }

    return filteredRecipes;
};