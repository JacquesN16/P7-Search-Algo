const searchOnRecipes = (searchingList, searchParams) => {
    const filteredRecipes = [];
    
    for (let i = 0; i < searchParams.length; i++) {
        let searchParam = searchParams[i]
        for (let i = 0; i < searchingList.length; i++) {
            const recipe = searchingList[i];
            if (isSearchWordExist(recipe.name, searchParam)) {
                filteredRecipes.push(recipe);
            } else if (isSearchWordExist(recipe.description, searchParam)) {
                filteredRecipes.push(recipe);
            } else {
                for (let y = 0; y < recipe.ingredients.length; y++) {
                    const ingredient = recipe.ingredients[y];
                    if (isSearchWordExist(ingredient.ingredient, searchParam)) {
                        filteredRecipes.push(recipe);
                        break;
                    }
                }
            }
        }
    }

    return filteredRecipes;
};