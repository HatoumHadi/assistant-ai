
## Installation

1. Create the database (ex: `template`)

2. `.env`

    - Terminal:
        ```shell
        cp .env.example .env
        ```
    - Adjust `.env`:
        ```shell
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=example-app
        DB_USERNAME=root
        DB_PASSWORD=
        ```

4. Terminal (Powershell, etc)
   ```shell
   composer i ; php artisan key:generate ; php artisan mi ; php artisan serve
   ```
      

