FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Disable Angular analytics prompt
RUN npx ng analytics off

EXPOSE 4200

# Command to run Angular dev server
CMD ["npm", "run", "start"]
