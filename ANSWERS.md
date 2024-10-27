1. How long did you spend on the coding test? <br/>
I started working on the project on 24-10-2024 (Thursday) and last commit is on 27-10-2024 (Sunday). First two days I spent appx 2-3 hours whereas last two days I spent appx hours
2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add. <br/>
   1. Moving db credentials to env file
   2. creating types folder and moving all types to this folder
   3. create controllers separately instead of having all logic in app.ts
   4. front-end testing -writing test for components
   5. Adding proper validation for APIs
   6. Authenticating APIs - probably using jwt as the basic one
   7. Writing remaining tests
   8. Convert current Insert query to bulk insert
3. Describe your solution in plain english. Point out your design decisions and the reasoning behind them.
   1. Project contains two folders - frontend and server
   2. Frontend is developed in React and components are placed in components folder
   3. Backend is developed in Node and express
   4. To keep everything simple, all APIs are defined in app.ts and only one other file is created db.ts. As the project grows, the traditional approach would be to separate routes, controllers and utils. Depending on requirements of the project, we can also separate it in features, where each folder would represent each feature and in this folder we can have all the files needed for the feature - like route, controller and helpers
   5. Due to time constraint, I couldn't create an ENV file therfore ideally this PR shouldn't be merged in real case scenario as the DB credentials are hardcoded in the source code
   6. I initally used sequelize for DB queries, but since it was time consuming to alter the table to have createdAt, updatedAt, primary foreign key etc. I decided to move with native postgres package
   7. Main goal was to handle as much as possible through queries rather than fetching objects and then filter values. Insert query is executed in for loop with is a bad design, therefore it needs to be handled through bulk insert.
4. Have you learned something new doing this test? If yes, describe it here. <br/>
Database queries has always been my weaker point, however for this project, I dug deeper into how to handle complex queries and was extremely happy to learn different ways in which certain transactions can be handled
5. Describe yourself using JSON. <br/>
```
{
"name": "Richa Joshi",
"age": 33,
"personalityType": "introvert",
"hobbies": ["reading", "solving jigsaw puzzle"],
"nationality": "Indian",
"location": "Amsterdam",
"languages": {
    "english": "proficient",s
    "dutch": "basic",
    "hindi": "proficient"
},
"movies": {
    "genre": ["comedy", "satire", "horror"]
}, 
"music": ["pop", "alternative", "country", "bollywood"],
"recentBooksRead": ["Permanent Record", "Devil in the white city", "Born a crime"]
}
```

    









