- [Updated solution overview]()

- [An overview of the solution](https://www.loom.com/share/2d0b19aae68b48c6bc0e82bcf67301c3?sid=1af4794b-d0c3-4c42-a6a9-67ab0c8c6918)


## About the project

#### Home Page
- On the main page, by clicking on the `Explore Events` button, we go to the events page.

#### Events Page
- On the page we see a list of all events that are displayed from the database.
- We can filter events by searching by title.
- We can sort events by date and by title (descending and ascending).
- By clicking on the `Create Event` button, we can create a new event that is stored in the database.(There are validation rules for creating an event).
- Each event card includes basic information about the event and has three buttons (delete, edit, and view details).
- Clicking on the `Edit` button opens a window with the current data that we can change and save.
- By clicking on the `Delete` button, a window opens where we have to confirm that we want to delete this card, after which it is deleted from the page and the database.
- By clicking on the `View Details` button, we can see more details about our event and recommended events.
- By clicking on the `Go to home page` button, we can return to the home page.
- We also see the google map, but unfortunately we can't do anything with it yet:(

## Technologies
- Node v20.10.0
- Next.js v14.0.4
- Nest.js v10.3.0
- PostgreSQL
- Material UI

## To run the project
- Make a fork
- Clone the project

### Frontend
- cd client
- npm install
- npm install @mui/material @emotion/react @emotion/styled
- npm install @mui/icons-material
- npm install @react-google-maps/api
- npm install google-map-reactnpm install --save-dev @types/google-map-react
- npm install --save-dev @types/google-map-react
- npm install framer-motion
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
