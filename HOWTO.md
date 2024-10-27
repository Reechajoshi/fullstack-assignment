- Currently, you need three terminals to run the project
  1. To run the front end - `npm start`
  2. To run the server - `npm start`
  3. To run the test - `npm test`

- If you make any changes in server, you need to build the project first using `npm build` and then re-run it using `npm start`

- run the docker using `docker compose up` or `docker-compose up` based on the OS you are using


- To test the frontend, you can choose `Berlin` and year `2024` to fetch some fruits
- For updating the stock - enter value in textbox and select the fruit that you need
- If you enter the quantity but not select the fruit, the fruit will not be sent to the server
- If you enter alphanumeric value in quantity, it will not send the fruit to server
- If you first select the fruit and then enter the amount, the value will not be added. First enter amount then select thr fruit (THIS IS A BUG)


- Server side: API `/consumption/:location/:year` is completely written with proper datatypes in typescript and tests for the same are present in `tests` folder