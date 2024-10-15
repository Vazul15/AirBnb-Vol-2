# 1. Építési szakasz
FROM node:18-alpine as build

WORKDIR /app

# Forráskód és csomagfájlok másolása
COPY package*.json ./
RUN npm install

COPY . .

# Alkalmazás buildelése (termelési build létrehozása)
CMD npm run dev -- --host

# # 2. Futtatási szakasz
# FROM node:18-alpine

# # WORKDIR /app

# # Buildelt fájlok másolása a build szakaszból
# COPY --from=build /app/dist /app/dist

# # Alkalmazás futtatása
# # CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
# CMD ["npm", "run", "dev"]

# Port megnyitása
EXPOSE 5173