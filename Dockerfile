# Menggunakan image Node.js versi 14
FROM node:20.10.0

# Menetapkan direktori kerja dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json untuk instalasi dependensi
COPY package*.json ./

# Menginstal dependensi proyek
RUN npm install

# Menyalin seluruh proyek ke dalam container
COPY . .

# Mengexpose port yang digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi menggunakan nodemon
CMD ["npm", "start"]
