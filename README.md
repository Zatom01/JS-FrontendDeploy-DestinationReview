This is the frontend. Backend is [here](https://github.com/Zatom01/destination-review-backend)


Welcome to Destination-Review!

This is a single page application that has Rails as an API (backend) and renders with Javascript (frontend).
You can create a country and add city's review or go into a country's page do the following:
    a. Add a review for a city
    b. Add likes on specific review
    c. Update a review
    d. Delete a review

Installation

Clone the repo:
https://github.com/Zatom01/destination-review-js-frontend.git [frontend]

https://github.com/Zatom01/destination-review-backend.git [backend]


Go to the project folder and run the server:

1. bundle install

2. rake db:seed

3. For backend : rails s
    Then go to http://localhost:3000

4. For frontend : npx reload -b
    Then go to http://localhost:8080
