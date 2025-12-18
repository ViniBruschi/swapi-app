# SWAPI - Star Wars API Client

Full-stack project for searching and querying data from the [SWAPI (Star Wars API)](https://swapi.dev/), developed with Laravel (backend) and React (frontend).

## 📋 About the Project

This project allows you to:
- Search for information about characters and films
- View API usage statistics
- Process statistics in the background through queues
- Schedule tasks to automatically calculate statistics

## 🛠️ Technologies

- **Backend**: Laravel 12 (PHP 8.4)
- **Frontend**: React 19 + Vite
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx

## 📦 Prerequisites

Before starting, make sure you have installed:

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)
- [Git](https://git-scm.com/downloads)

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/ViniBruschi/swapi-app.git
cd my-laravel-projects
```

### 2. Configure the Environment

#### Backend

Copy the environment variables example file:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file and configure the following variables (if needed):

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=swapi
DB_USERNAME=swapi
DB_PASSWORD=password
```

> **Note**: Database credentials are already configured in `docker-compose.yml`. You can use these same credentials in `.env` or change them as needed.

## Docker Configuration for macOS (Apple Silicon – M1/M2/M3)

On macOS machines with Apple Silicon, the MySQL container may present compatibility issues if the platform is not explicitly defined.

Add the `platform` directive to the MySQL service:

```yaml
services:
  mysql:
    image: mysql:8.0
    platform: linux/amd64
    environment:
      MYSQL_DATABASE: app
      MYSQL_USER: app
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3306:3306"
```
### Note

Without this configuration, the MySQL container may fail to start or behave unpredictably on ARM-based Macs.

### 3. Start the Containers

In the project root, run:

```bash
docker-compose up -d --build
```

This command will:
- Build the Docker images
- Start all services (backend, frontend, nginx, mysql, scheduler, queue)
- Run in daemon mode (background)

### 4. Install Backend Dependencies

Run the commands inside the backend container:

```bash
docker-compose exec backend composer install
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate
```

### 5. Install Frontend Dependencies

```bash
docker-compose exec frontend npm install
```

### 6. Access the Application

After all containers are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:9000/api

## 📁 Project Structure

```
my-laravel-projects/
├── backend/                 # Laravel Application
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   └── SwapiController.php
│   │   ├── Jobs/
│   │   │   └── ComputeSwapiStatistics.php
│   │   ├── Models/
│   │   │   ├── SwapiLog.php
│   │   │   └── SwapiStatistic.php
│   │   └── Services/
│   │       └── SwapiService.php
│   ├── database/migrations/
│   ├── routes/
│   │   └── api.php
│   └── docker-entrypoint.sh
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
└── docker-compose.yml      # Docker Configuration
```

## 🔌 API Endpoints

### Search Resources

```
GET /api/swapi/{type}?q={query}
```

**Parameters:**
- `type`: Resource type (e.g., `people`, `films`, `planets`, `starships`, `vehicles`, `species`)
- `q`: Search term (query parameter)

**Example:**
```bash
curl "http://localhost:9000/api/swapi/people?q=luke"
```

### Get Film by ID

```
GET /api/swapi/films/{id}
```

**Example:**
```bash
curl "http://localhost:9000/api/swapi/films/1"
```

### Get Person by ID

```
GET /api/swapi/people/{id}
```

**Example:**
```bash
curl "http://localhost:9000/api/swapi/people/1"
```

### Get Statistics

```
GET /api/swapi/statistics
```

Returns API usage statistics, including:
- Top most searched queries
- Average response time
- Most popular usage hour
- Last calculation date/time

## 🐳 Docker Services

The project uses the following containers:

- **backend**: Laravel application (PHP-FPM)
- **nginx**: Web server (port 9000)
- **frontend**: React application (port 5173)
- **mysql**: MySQL database (port 3306)
- **scheduler**: Laravel Scheduler worker
- **queue**: Laravel queue worker

## 🔧 Useful Commands

### View container logs

```bash
docker-compose logs -f
```

### View logs from a specific service

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stop containers

```bash
docker-compose down
```

### Stop and remove volumes (clean database)

```bash
docker-compose down -v
```

### Run Artisan commands

```bash
docker-compose exec backend php artisan [command]
```

### Run migrations

```bash
docker-compose exec backend php artisan migrate
```

### Run tests

```bash
docker-compose exec backend php artisan test
```

### Access backend container

```bash
docker-compose exec backend bash
```

### Access MySQL

```bash
docker-compose exec mysql mysql -u swapi -ppassword swapi
```

## 🔄 Background Processing

The project uses Laravel queues to process statistics in the background. The scheduler automatically runs every 5 minutes to calculate API usage statistics.

## 🐛 Troubleshooting

### Storage permission error

```bash
docker-compose exec backend chmod -R 777 storage bootstrap/cache
```

### Rebuild containers

```bash
docker-compose down
docker-compose up -d --build
```

### Clear Laravel cache

```bash
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan cache:clear
```

### Database connection issues

If the database is not connecting, check:
1. If the MySQL container is running: `docker-compose ps`
2. If the credentials in `.env` are correct
3. If the database was created: `docker-compose exec mysql mysql -u root -proot -e "SHOW DATABASES;"`

## 📝 Important Notes

- The project uses Docker volumes for development, so code changes are automatically reflected
- The scheduler and queue workers run in separate containers for better scalability
- Statistics are automatically calculated every 5 minutes through the Laravel Scheduler

## 📄 License

This project is licensed under the MIT License.
