FROM node:carbon as build

# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND
# package-lock.json are copied where available (npm@5+)
COPY package.json /app/package.json

RUN npm install

RUN npm install react-scripts@3.0.1 -g 

# Bundle app source
COPY . /app

RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]