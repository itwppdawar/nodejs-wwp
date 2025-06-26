FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) first
COPY package*.json ./

# Copy seluruh source code ke dalam container
COPY . .

# Install dependencies
RUN npm install

# Expose port (ganti 3000 sesuai port aplikasi Anda)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
