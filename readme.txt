Running the project:
    - Create an Infura Endpoint
        - Create a new key in Infura; use WEB3 API as Network
        - Go to "Manage Key", select "Websockets" and your preferred Network (Mainnet, Goerli, etc.)
        - In order to get actual data from the Ethereum network choose Mainnet
        - Copy url of Endpoint
    - In a terminal save the url of the endpoint as an environment variable called "URL"
    - Start MongoDB by running "mongod" in a terminal
    - To start the application run "node index.js" in the same terminal where the environment variable "URL" was saved

