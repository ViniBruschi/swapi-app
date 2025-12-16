#!/bin/bash
set -e

php artisan schedule:work &

exec docker-php-entrypoint php-fpm
