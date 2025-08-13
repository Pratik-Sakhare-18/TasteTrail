let categoriesContainer = document.getElementById("categories-container")
let serchInput = document.getElementById("serch-food")

let allCardsInnerHtml = ""
const loadcategories = async () => {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
        let data = await response.json()
        console.log(data)
        if (!data.meals) {
            throw new Error("something went wrong")
        }

        for (let categories of data.meals) {

            allCardsInnerHtml += `<div class="catergiries-main-container" onclick="searchBycard('${categories.strMeal}')">
             <div class="categiries-card-img">
                <img src="${categories.strMealThumb}">
             </div>
             <div class="categiries-type">${categories.strMeal}</div>
         </div>`

        }

        categoriesContainer.innerHTML = allCardsInnerHtml

    } catch (error) {
        console.error(error)
    }
}

loadcategories()

const searchBycard = (foodIteam) => {
    loadSearchResult(foodIteam)
    setTimeout(() => {
        window.location.href = "./pages/result.html"
    }, 1000)
}

// load serchBox 
serchInput.addEventListener("keydown", (e)=> {
    if (e.key === "Enter") {
        loadSearchResult(serchInput.value)
        serchInput.value = ""
        setTimeout(() => {
            window.location.href = "./pages/result.html"
        }, 1000)
    }
})

// search food 

let loadSearchResult = async (foodIteam) => {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodIteam.split(" ").join("%20")}`)
        let data = await response.json()

        if (!data.meals) {
            let err = {
                "message": "noting to show"
            }
            localStorage.setItem("searchRes", JSON.stringify(err))

        } else {
            localStorage.setItem("searchRes", JSON.stringify(data.meals))
        }

    } catch (error) {
        console.log(error)
    }
}