const body = document.querySelector('body');
const mainContainer = document.querySelector('#main-container');

 // append new elements to DOM 

// the issue:

//I want to create a new div for each recipe with the recipe content inside
 


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
    // store results in variables 



    
    //create function that returns title of recipe for each item in array
    const buildRecipeCard = function(recipeItem){
     // create elements needed to build a card
        const div = document.createElement('div');
        const heading = document.createElement('h3');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const ingredients = document.createElement('p');
        
    
    // append created elements to DOM
        // const body = document.querySelector('body');
        mainContainer.append(div);
        heading.append(link);
        div.append(heading);
        div.append(img);
        div.append(ingredients);

    // store information in variables 
        let image = recipeItem.recipe.images.SMALL.url;
        let recipeTitle = recipeItem.recipe.label;
        let recipeIngredients = recipeItem.recipe.ingredientLines;
        let allergies = recipeItem.recipe.cautions;
        let recipeURL =  recipeItem.recipe.url;
    
    //function to set multiple attributes 
    function setAttributes(element, attributes){
        for(let key in attributes){
            element.setAttribute(key, attributes[key]);
        }
    }

    // set attributes
        div.setAttribute('id','recipeResults');
        img.setAttribute("src", image);
        setAttributes(link, {"href": recipeURL, "target": "_blank"});
        
        
        ingredients.innerHTML = recipeIngredients;
        link.innerHTML = recipeTitle;

        div.appendChild(heading);
        div.appendChild(img);
        return console.log("label for recipe:", recipeItem.recipe.label);
    }
    //issue: some of the images dont have the sizes available
    // function foodImage(recipeItem){
    //     return console.log(recipeItem.recipe.images.SMALL.url);
    // }
    results.forEach(foodItem =>
        buildRecipeCard(foodItem)
    );




    // function recipeIngredients(recipeItem){
    //     return console.log("ingredients for recipe:", recipeItem.recipe.ingredientLines);
    // }

    // function allergies(recipeItem){
    //     return console.log("allergies for recipe:", recipeItem.recipe.cautions);
    // }

    // function recipeURL(recipeItem){
    //     return console.log("url for images:", recipeItem.recipe.url)

    // }
    // function to delete all elements created last time when the button is pressed 
    // results.forEach(recipeTitle);
    // results.forEach(recipeIngredients); 
    // results.forEach(recipeURL);
    // results.forEach(allergies);
    // results.forEach(foodImage);

}
// function recipeDisplay(results){
// selects inner html of content and updates the dom
// }
// you can change the whole conent of an html element in a function

// TO-DO: find way to delete elements of child






// function reloadPage(){
//     window.location.reload(true);
// }







function handleClick(){
    let food = handleInputChange();
    if (food !== ""){
        fetchRecipe(food);
        mainContainer.replaceChildren();
        // recipeResults.replaceChild(food, title)
    }else{
        alert("Please enter a recipe!")
    }
    
}


let button = document.querySelector("#recipe-button");

button.addEventListener("click", handleClick);

// when give me a recipe button is pressed, 
//i want the app to update information on the dom