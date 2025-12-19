#!/bin/sh
set -e

echo "Fixing Laravel permissions..."

mkdir -p storage bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

exec docker-php-entrypoint php-fpm
