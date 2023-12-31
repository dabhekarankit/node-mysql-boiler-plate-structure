# Node Js Boiler Plate Structure

NodeJs MySql boiler plate structure with swagger integration.

## Installation

Clone repositories

```
git clone https://github.com/dabhekarankit/node-mysql-boiler-plate-structure.git
```

Move to project folder

```
cd node-mysql-boiler-plate-structure
```

Run below CMD

```
npm i
cp .env.example .env
```

Set DB config in .env file

```
DB_CONNECTION=mysql
DB_PORT=3306
DB_HOST=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=node-mysql-boiler-plate-structure
```

Run project

```
npm run start:local
```

Open in chrome

```
http://localhost:3008/api/documentation
```
