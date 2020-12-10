class Country {

    static all = []

    constructor(id, name, continent, image, countryLikes = 0) {

        this.id = id
        this.name = name
        this.continent = continent
        this.image = image
        this.countryLikes = countryLikes
        this.renderCountry()

    }



    countryHTML() {
        return `
            <img src="${this.image}" width ="100" /><br>
            <a href= "/countries/${this.id}"><h2 class="header">${this.name}</h2></a>
            <p>${this.continent}</p>
            <h4 class="countryLikeValue">${this.countryLikes}</h4>
            <button class="country-like">Like ? </button><br><br>
            <button class="delete" data-id="${this.id}"> DELETE ? </button><br><br>
        `
    }

    reviewHTML() {
        return `
            <br><br>
            <h1 class="centerClass">Here are ${this.name}'s city reviews</h1>
        `
    }

    deleteCountry(e) {
        const id = parseInt(e.target.dataset.id)
        fetch(`http://localhost:3000/countries/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                document.getElementById("country-container").removeChild(document.getElementById(id))
            })
    }

    static deleteReview(e) {

        const id = parseInt(e.target.dataset.id)
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                document.getElementById("country-container").removeChild(document.getElementById(id))
            })
    }

    static updateReviewLikes(e) {

        let id = parseInt(e.target.dataset.id)
        let likes = parseInt(e.target.parentElement.querySelector('.like-value').innerText)
        let new_likes = likes + 1
        e.target.parentElement.querySelector('.like-value').innerText = new_likes

        let likeData = {
            'likes': new_likes
        }

        fetch(`http://localhost:3000/reviews/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likeData)
        })
            .then(resp => resp.json())

    }

    static updateReview(e) {
        debugger
        const id = parseInt(e.target.dataset.id)
        const city_visited = e.target.parentElement.querySelector(".city").innerText
        const date_visited = e.target.parentElement.querySelector(".date").innerText
        const experience = e.target.parentElement.querySelector(".experience").innerText
        const body = document.body
        body.innerHTML = `
            <br><br>
            <h1 class="centerClass">Update Review</h1>
            <div id ="form">
                <form id="edit-form">
                    <input type="text" name="city" placeholder="city visited" />
                    <br><br>
                    <input type="text" name="date" placeholder="date visited" />
                    <br><br>
                    <input class="inputBox" type="text" name="experience" placeholder="experience">
                    <br><br>
                    <input type="submit" value="Update" class='btn btn-primary'>
                </form>
            </div>

            `
        document.body.querySelector("#edit-form").city.value = city_visited
        document.body.querySelector("#edit-form").date.value = date_visited
        document.body.querySelector("#edit-form").experience.value = experience
        document.body.addEventListener("submit", function (e) {
            let updated_city = e.target.city.value
            let updated_date = e.target.date.value
            let updated_experience = e.target.experience.value
            let reviewData = {
                'city_visited': updated_city,
                'date_visited': updated_date,
                'experience': updated_experience
            }

            fetch(`http://localhost:3000/reviews/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
                .then(resp => resp.json())
        })

    }


    renderCountry() {
        const countryContainer = document.getElementById('country-container')
        const countryCard = document.createElement("div")
        countryCard.classList.add('country-card')
        countryCard.id = this.id
        countryCard.innerHTML += this.countryHTML()
        countryContainer.appendChild(countryCard)
        countryCard.addEventListener("click", e => {
            if (e.target.className.includes("delete")) { this.deleteCountry(e) }
            if (e.target.className.includes("header")) { this.showCountry(e, countryCard.id) }
            if (e.target.className.includes("country-like")) { this.updateCountryLike(e) }
        })
    }


    updateCountryLike(e) {

        let initialLike = this.countryLikes
        let htmlLike = parseInt(e.target.parentElement.querySelector('.countryLikeValue').innerText)
        let new_likes = htmlLike + 1
        e.target.parentElement.querySelector('.countryLikeValue').innerText = new_likes


    }

    showCountry(e, countryId) {

        e.preventDefault()
        //updating upper portion input form for review only
        let country_id = parseInt(countryId)
        document.querySelector(".centerClass").innerHTML = ``
        let form = document.querySelector("#form")
        form.innerHTML = `
            <form id="review-form">
                <h3 class="countryId">${country_id}</h3>
                <h3>Would you like to add a Review for this country?</h3>
                <input type="text" name="city" placeholder="city visited" /><br><br>
                <input type="text" name="date" placeholder="date visited" /><br><br>
                <input type="text" name="experience" class="inputBox" placeholder="experience" />
                </textarea><br><br>
                <input type="submit" value="Submit" class='btn btn-primary'>
            </form>

            `

        form.addEventListener("submit", function (e) {

            let country_id = parseInt(e.target.parentElement.querySelector(".countryId").innerHTML)
            let city_visited = e.target.parentElement.querySelector("#review-form").city.value
            let date_visited = e.target.parentElement.querySelector("#review-form").date.value
            let experience = e.target.parentElement.querySelector("#review-form").experience.value
            API.createNewReview(country_id, city_visited, date_visited, experience)

        })

        //buidling review-card
        const countryContainer = document.getElementById('country-container')
        countryContainer.innerHTML = ""
        const reviewTitle = document.createElement("div")
        reviewTitle.classList.add("review-title-card")
        reviewTitle.innerHTML += this.reviewHTML()
        countryContainer.appendChild(reviewTitle)
        API.postReviews(this.id)

    }

    static renderReview(id, city_visited, date_visited, experience, likes) {
        const countryContainer = document.getElementById("country-container")
        // countryContainer.id = "review-container"
        const reviewCard = document.createElement("div")
        reviewCard.classList.add("review-card")
        reviewCard.id = id
        const newHTML = `

            <p>REVIEW ID: ${id}</p>
            <p class="city">${city_visited}</p>
            <p class="date">${date_visited}</p>
            <p class="experience">${experience}</p>
            <p class="like-value">${likes}</p>
            <button class="likes" data-id="${id}"> LIKE ME ? </button><br><br>
            <button class="delete" data-id="${id}"> DELETE ? </button><br><br>
            <button class="update" data-id="${id}"> UPDATE ? </button>

        `

        reviewCard.innerHTML += newHTML
        countryContainer.appendChild(reviewCard)
        reviewCard.addEventListener("click", e => {
            if (e.target.className.includes("delete")) { this.deleteReview(e) }
            if (e.target.className.includes("likes")) { this.updateReviewLikes(e) }
            if (e.target.className.includes("update")) { this.updateReview(e) }
        })
    }

}
