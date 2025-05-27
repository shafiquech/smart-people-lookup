# 1. Use the Node Alpine image
FROM node:18-alpine AS development

# 2. Set environment variable
ENV NODE_ENV=development

# 3. Set working directory inside container
WORKDIR /react-app

# 4. Copy dependency files first to leverage Docker caching
COPY package*.json ./

# 5. Install dependencies (you used --legacy-peer-deps which is fine for resolving peer issues)
RUN npm install --legacy-peer-deps

# 6. Copy the rest of the source code
COPY . .

# 7. Expose the React default port (optional but useful)
EXPOSE 3000

# 8. Start the application
CMD ["npm", "start"]
