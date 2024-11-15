const API_KEY = "2b17214c61844b2681a5c27e3cbfbf61";
const recipeListElement = document.getElementById("recipe-list");

displayRecipes = (recipes) => {
    recipeListElement.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItemElement = document.createElement("li");
        recipeItemElement.classList.add("recipe-item");
        const recipeImageElement = document.createElement("img");
        recipeImageElement.src = recipe.image;
        recipeItemElement.alt = "recipe image";

        const recipeTitleElement = document.createElement("h2");
        recipeTitleElement.textContent = recipe.title;

        const recipeIngredientesElement = document.createElement("p");
        recipeIngredientesElement.innerHTML = `
        <span><strong>Ingredientes:</strong> ${recipe.extendedIngredients
            .map((ingredient) => ingredient.original)
            .join(", ")}
            </span>
        `

        const recipeLinkElement = document.createElement("a");
        recipeLinkElement.href = recipe.sourceUrl;
        recipeLinkElement.textContent = "Ver Receta";

        recipeItemElement.appendChild(recipeImageElement);
        recipeItemElement.appendChild(recipeTitleElement);
        recipeItemElement.appendChild(recipeIngredientesElement);
        recipeItemElement.appendChild(recipeLinkElement);
        recipeListElement.appendChild(recipeItemElement);
    });

    
}
async function getRecipes() {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );
    
    const data = await response.json();
    return data.recipes;
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();