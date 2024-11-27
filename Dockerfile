# Use the official PHP image from Docker Hub
FROM php:8.0-apache

# Copy your PHP project files to the container
COPY . /var/www/html/

# Install dependencies (if necessary, for example MySQL)
RUN docker-php-ext-install mysqli

# Expose port 80 (the default HTTP port)
EXPOSE 80

# Start the Apache server
CMD ["apache2-foreground"]
