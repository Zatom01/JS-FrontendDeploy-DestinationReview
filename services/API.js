class API {

    static addCountrys() {
        fetch("http://localhost:3000/countries")
            .then(resp => resp.json())
            .then(countries => {
                countries.forEach(country => {
                    const { id, name, continent, image } = country //mass assignment
                    new Country(id, name, continent, image)
                })
            })
    }


    static addCountry(e) {

        e.preventDefault()
        let data = {
            "name": e.target.name.value,
            "continent": e.target.continent.value,
            "image": e.target.img.value,
            "reviews_attributes": [{
                'city_visited': e.target.city.value,
                'date_visited': e.target.date.value,
                'experience': e.target.experience.value

            }]



        }

        fetch("http://localhost:3000/countries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

            .then(resp => resp.json())
            .then(country => {
                const { id, name, continent, image } = country
                new Country(id, name, continent, image)
                document.getElementById('country-form').reset()

            })
    }


    static postReviews(id) {

        fetch(`http://localhost:3000/countries/${id}`)
            .then(resp => resp.json())
            .then(data => {
                const reviewsArray = data.reviews
                reviewsArray.forEach(review => {
                    const id = review.id
                    const city_visited = review.city_visited
                    const date_visited = review.date_visited
                    const experience = review.experience
                    const likes = review.likes

                    Country.renderReview(id, city_visited, date_visited, experience, likes)


                })
            })
    }

    static createNewReview(country_id, city_visited, date_visited, experience) {

        let data = {
            "city_visited": city_visited,
            "date_visited": date_visited,
            "experience": experience,
            "country_id": country_id
        }

        fetch("http://localhost:3000/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

            .then(resp => resp.json())
    }

}
