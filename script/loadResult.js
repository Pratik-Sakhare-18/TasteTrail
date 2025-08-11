let result = JSON.parse(localStorage.getItem("searchRes")) 
console.log(result)


let mainRecipeContainer = document.getElementById("main-recipe-container")
let errorContainer = document.getElementById("error-container")
let mainIngredientsContainer = document.getElementById("main-ingredients-container")
let btnBack = document.getElementById("btn-back")




const createIngredients = (allinfo) => {
    let mainIngredients = []
    let ingredientsName = []
    let ingredientsQuantity = []
    let mainInnerHtml = ""

    for (let ingredients in allinfo) {
        if (ingredients.includes("strIngredient") || ingredients.includes("strMeasure")) {
            mainIngredients.push(allinfo[ingredients])
        }
    }

    for (let i = 0; i < mainIngredients.length / 2; i++) {
        ingredientsName.push(mainIngredients[i])
    }

    for (let i = mainIngredients.length / 2; i < mainIngredients.length; i++) {
        ingredientsQuantity.push(mainIngredients[i])
    }

    ingredientsName = ingredientsName.filter((i) => i !== "" && i !== " ")
    ingredientsQuantity = ingredientsQuantity.filter((i) => i !== " " && i !== "")

    for (let i = 0; i < ingredientsName.length; i++) {
        mainInnerHtml += `<span class="ingredient-body">${ingredientsName[i]} : ${ingredientsQuantity[i]}</span>`
    }

    return mainInnerHtml

}





const createRecipeCrads = () => {

    let cardsHtml = ""

    if (result.message) {

        cardsHtml = `<div class="error-container" id="error-container">
            <div class="error-img-container">
                <img src="../images/bowl.png" />
            </div>
            <h4>Bowl is empty..</h4>
            <button class="btn-back" id="btn-back" onclick="window.location.href = '/index.html'"><i class="ri-arrow-left-line"></i>Back to home</button>
        </div>`

    } else {
   
        document.title = "TasteTrial | " + result[0].strMeal
        


    for(i=0 ; i<result.length ;i++)
    {
        cardsHtml += `<div class="result-container-body">
        <h3>${result[i].strMeal}</h3>
        <div class="recipe-info-container">
            <div class="result-container-img">
                <img src="${result[i].strMealThumb}">
            </div>  
                
                <p+ id="main-ingredients-container">
                <h2>Ingredients</h2>
                  ${createIngredients(result[i])}
                  </p>
                   <h2>Instructions</h2>
                        <p class="instructions">${result[0].strInstructions}</p>

                         <h2>Sources</h2>
                         <a href="${result[0].strSource}" target="_blank">${result[0].strSource}</a>
                         <br>
                         <br>
                         <a href="${result[0].strYoutube}" target="_blank">${result[0].strYoutube}</a>
                    </div>
                </div>
           </div>
       </div>`
                    
    }
}
    return cardsHtml
}

let cardsHtml = createRecipeCrads()
mainRecipeContainer.innerHTML = cardsHtml