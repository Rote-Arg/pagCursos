# Base image
FROM nginx:1.21.1-alpine

# Create app directory
WORKDIR /pagCursos

# Copy app files
COPY ./ /pagCursos

# Expose port
EXPOSE 5054

# that's a html simple page don't need to run npm install or other stuff and expose with another container with nginx