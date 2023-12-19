- [Loom]()

## About the project


## Technologies
- Node v20.10.0
- Next.js
- Nest.js
- PostgresSQL
- Material UI

## To run the project
- Make a fork
- Clone the project

### Frontend
- cd client
- npm install
- npm install @mui/material @emotion/react @emotion/styled
- npm run dev
- Open `http://localhost:3000/`

### Backend
- cd server:
- npm install
- npm install --save @nestjs/typeorm typeorm
- npm install pg --save
- npm start
- Open `http://localhost:4000/events`

### Postgres
- open pgAdmin 4
- create database - event_management
- in cd server - src/ormconfig.json and src/app.module.ts write your username and password
