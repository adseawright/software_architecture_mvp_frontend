# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# If you are building for production, use npm ci
# RUN npm ci --only=production

# Copy the rest of your application's source code
COPY . .

# Expose the application on port 3000
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
