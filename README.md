# sht.r
## relief is right around the corner

[link to live app](https://shtr.herokuapp.com/)

### Technologies and Frameworks Used
HTML, CSS, JavaScript, Git, Mongo, AngularJs, bcrypt, dotenv express, express-sessions, mongoose, bootstrap, Google Maps static maps and geolocation APIs

### Approach Taken
We created a Trello board to divide up the tasks amongst us and to keep track of what was pushed to the repository and when.  We were also in pretty much constant contact throughout the course of the project to try to keep the git conflicts to a minimum.

After some user stories to determine what functionality we needed in our app, we divided up the task of building a basic crud app by folder.  One person on controllers, one on models, one on server.js.  After these were done, we moved on to the next set of tasks in a similar fashion. This way, we could all push without conflicting.  

Once the basic crud app was working, we built in the login functionality and refined our page based on what our needs were.  After this step, Caleb spearheaded the google maps api integration while Justin and Brendan continued working on the separate app functionality.  We found that by starting code in a partials file, even if we knew we would move it to the main file, we were able to avoid many conflicts because no one would have any reason to touch the same file.

After the map api and the basic functionality was in place, Brendan styled the page using bootstrap.  Toward the end, when there was really only one file to work on, we collaborated over video chat with one person inputing the changes that we all made.

### User Stories
1. The user should be able to register and log in
2. The user should see a list of bathrooms available in their city
3. The user should see all available bathrooms form the list on a map
4. When logged in, the user can easily be taken back to their home city on the map by clicking "home"
5. When logged in, the user should be able to add entries to the bathroom list
6. When logged in, the user should be able to edit and delete bathroom entries
7. The user should be able to see and update if they need to make a purchase or if the bathroom is clean

### Wins
1. Getting the google map api working the way we wanted was nothing short of a miracle
2. We were able to filter results by city so that when you're in Boston, you only see Boston bathrooms on your list
3. We were able to leverage the bootstrap framework to add some great styling to the page



### Unsolved Problems

1. We were hoping to get the 'is clean' selection to be a five star rating rather than a boolean, but it didn't feel absolutely necessary toward the end of the project
2. When a user adds a bathroom, to see that change the page must be reloaded. This is not great from the UX perspective


### Future goals for the project 

1. When hovering over the bathroom marker on the map, the user should see the address and all information about that particular bathroom
