const displayItems = items => {
  const itemContainer = document.querySelector('#food-item-container .row');
  itemContainer.innerHTML = '';
  items.forEach((item) => {
    const mealDiv = document.createElement('div');
    mealDiv.className = 'col-md-3 my-2';
    mealDiv.innerHTML = `
            <div class="card shadow mb-5 bg-white custom-rounded" data-bs-toggle="modal" data-bs-target="#itemInfo-${item.strMeal}">
                <img class="card-img-top" src= "${item.strMealThumb}">
                     <div class="card-body">
                    <h5 class="text-center meal-name">${item.strMeal}</h5>
              </div>
            </div>

            <!--modal-->
            ${showModal(item)}
            
        `;
    itemContainer.appendChild(mealDiv);
  });
}

const showModal = (item) => {
  return `<div class="modal fade" id="itemInfo-${item.strMeal}" tabindex="-1" aria-labelledby="itemInfo-${item.strMeal}Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-center" id="itemInfo-${item.strMeal}Label">${item.strMeal}</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src=${item.strMealThumb} class="img-fluid img-thumbnail my-4">
          <h4 class="text-center mx-3 text-primary">Ingredients List</h4>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient1 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient2 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient3 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient4 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient5 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient6 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient7 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient8 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient9 || '-'}</div>
          <div><i class="fas fa-check-square"></i> ${item.strIngredient10 || '-'}</div>
          <h3 class="text-center text-primary">Instructions</h3>
          <div> ${item.strInstructions}</div>
        </div>
      </div>
    </div>
  </div>`
}


// Search
const searchItem = async () => {
  const searchText = document.getElementById('search-term').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  // load data from api
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayItems(data.meals);
  } catch (error) {
    showErrorMessage('The item you are looking for does not exists!! Please try again!');
  }
}
searchItem();

// show error message
const showErrorMessage = (message) => {
  const errorMsgContainer = document.getElementById('errorLabel');
  errorMsgContainer.innerHTML = `<h1 class="text-center text-danger">${message}</h1>`;
}

