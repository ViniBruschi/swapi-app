FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
        libonig-dev \
        libzip-dev \
        zip \
        unzip \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        bcmath
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY . /var/www/html
RUN mkdir -p storage bootstrap/cache && chmod -R 777 storage bootstrap/cache
RUN composer install --no-interaction --no-dev --optimize-autoloader