# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
