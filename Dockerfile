# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all project files into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use Nginx to serve the app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Step 8: Expose port 80
EXPOSE 80

# Step 9: Run Nginx
CMD ["nginx", "-g", "daemon off;"]
