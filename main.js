import {recipes} from './recipes.js';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += i <= rating ? '<span aria-hidden="true" class="icon-star">⭐</span>' : '<span aria-hidden="true" class="icon-star-empty">☆</span>';
    }
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">${starsHtml}</span>`;
}

function recipeTemplate(recipe) {
    return `
    <div id="recipeContainer"></div>
    <div class="main-box">
        <img class="food-image" src='${recipe.image}' alt="${recipe.name}">
        <section class="recipe-info">
            <div class="recipe-category">${tagsTemplate(recipe.tags)}</div>
            <h2 class="title">${recipe.name}</h2>
            <div class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">${ratingTemplate(recipe.rating)}
            </div>
            <p class="description">${recipe.description}</p>
        </section>
    </div>
    `;
}

function renderRecipes(recipeList) {
    const recipeContainer = document.querySelector('#recipeContainer');
    recipeContainer.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}

function filterRecipes(query) {
    const filterFunction = recipe => {
        query = query.toLowerCase();
        return recipe.name.toLowerCase().includes(query) ||
               recipe.description.toLowerCase().includes(query) ||
               recipe.tags.some(tag => tag.toLowerCase().includes(query));
    };

    const sortFunction = (a, b) => a.name.localeCompare(b.name);

    const filtered = recipes.filter(filterFunction);
    const sorted = filtered.sort(sortFunction);
    return sorted;
}

function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.querySelector('#searchInput');
    const query = searchInput.value.trim();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

document.querySelector('#search-button').addEventListener('click', searchHandler);

function init() {
    const randomRecipe = getRandomListEntry(recipes);
    renderRecipes([randomRecipe]);
}

document.addEventListener('DOMContentLoaded', init);
