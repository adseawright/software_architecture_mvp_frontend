# software_architecture_mvp_frontend

## Description
 Frontend for Kids to Sell Products Online - This is the frontend for my MVP project in the Software Architecture course at PUC-Rio. Developed with React, it allows users to manage profiles, stores, and products, and facilitates online shopping. It communicates with the backend API and is containerized with Docker.

## Installation Instructions

### Prerequisites
- Node.js
- Docker

### Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/software_architecture_mvp_frontend.git
    cd software_architecture_mvp_frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the server:
    ```sh
    npm start
    ```

### Docker Setup
1. Build and run the Docker container:
    ```sh
    docker build -t my-project-frontend .
    docker run -p 3000:3000 my-project-frontend
    ```

## Usage Instructions
1. Ensure the backend server is running.
2. Ensure the frontend server is running.
3. Open the browser and navigate to `http://localhost:3000`.
