# Use an official Node.js image as the base image
FROM node:18

# Install Python (required for youtube-dl-exec)
RUN apt-get update && apt-get install -y python3 python3-pip && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and handle potential peer-dependency issues
RUN npm install --legacy-peer-deps --no-audit

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Command to start the application
CMD ["node", "App.js"]
