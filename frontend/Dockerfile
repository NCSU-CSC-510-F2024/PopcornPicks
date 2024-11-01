# Use a Node image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port React will run on
EXPOSE 3000

# Start the React application
# CMD ["npm", "start"]
