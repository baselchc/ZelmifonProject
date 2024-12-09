# Use Node.js version 18 or higher
FROM node:18-alpine

# Setting the working directory inside the container
WORKDIR /app

# Copying package.json and package-lock.json/yarn.lock files to the container
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the application's source code
COPY . .

# Building the Next.js application
RUN npm run build

# Exposing the port that the app will run on
EXPOSE 3000

# Starting the application
CMD ["npm", "start"]
