#!/bin/bash
set -e

# Iniciar o scheduler do Laravel em background
php artisan schedule:work &

# Executar o PHP-FPM no foreground (mantém o container rodando)
exec docker-php-entrypoint php-fpm
