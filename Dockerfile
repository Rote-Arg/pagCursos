# Base image
FROM nginx:latest

# Create app directory
WORKDIR /pagCursos-web

# Copy app files
COPY . /usr/share/nginx/html/pagCursos-web

# Expose port
EXPOSE 5054

# that's a html simple page don't need to run npm install or other stuff and expose with another container with nginx