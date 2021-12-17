 let recipeResults = document.querySelector("#recipe-results");


function handleInputChange() {
    const userInput = document.querySelector("#food-input").value;
    return userInput
}


async function fetchRecipe(food) {
    //define response as empty 
    
    let response;
    response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}: &app_id=a2ec9e1b&app_key=5a133b236b2bb5b002a40f2e49360364`);
    const data = await response.json();
    //results with info we need
    //an arrary of objects within objects)
    const results = data.hits;
    console.log({results});
    
    //create function that returns title of recipe for each item in array
    function recipeTitle(recipeItem){
        let title = document.createElement("H1");
        let foodImage = document.createElement("IMG");
        let image = recipeItem.recipe.images.SMALL.url;
        foodImage.setAttribute("src", image);
        //create  a h1 element
        // insert text
        title.innerHTML = recipeItem.recipe.label;
        //append h1 to body of html
        recipeResults.appendChild(title);
        recipeResults.appendChild(foodImage);
        return console.log("label for recipe:", recipeItem.recipe.label);
    }
    //issue: some of the images dont have the sizes available
    // function foodImage(recipeItem){
    //     return console.log(recipeItem.recipe.images.SMALL.url);
    // }
    function recipeIngredients(recipeItem){
        return console.log("ingredients for recipe:", recipeItem.recipe.ingredientLines);
    }

    function allergies(recipeItem){
        return console.log("allergies for recipe:", recipeItem.recipe.cautions);
    }

    function recipeURL(recipeItem){
        return console.log("url for images:", recipeItem.recipe.url)

    }
    // function to delete all elements created last time when the button is pressed 
    results.forEach(recipeTitle);
    results.forEach(recipeIngredients); 
    results.forEach(recipeURL);
    results.forEach(allergies);
    // results.forEach(foodImage);

}
// function recipeDisplay(results){
// selects inner html of content and updates the dom
// }
// you can change the whole conent of an html element in a function

// TO-DO: find way to delete elements of child






function reloadPage(){
    window.location.reload(true);
}







function handleClick(){
    let food = handleInputChange();
    if (food !== ""){
        fetchRecipe(food);
        recipeResults.replaceChildren();
        // recipeResults.replaceChild(food, title)
    }else{
        alert("Please enter a recipe!")
    }
    
}


let button = document.querySelector("#recipe-button");

button.addEventListener("click", handleClick);

// when give me a recipe button is pressed, 
//i want the app to update information on the dom