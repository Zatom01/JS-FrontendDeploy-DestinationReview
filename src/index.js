
document.addEventListener("DOMContentLoaded", function () {

    API.addCountrys()

    document.getElementById("country-form").addEventListener("submit", API.addCountry)

})
