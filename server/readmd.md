## How to start

### under dev_DB directory:

create .env file

Choose username and password and put they in .env file

docker-compose up -d

### Under server directory

Install npm packages (npm i)

Create .env file with template and set same username and password you chose above:
DB_USER=''
DB_PASSWORD=''
DB='digimajakka_db'
HOST='localhost'

npm run devStart

## Routes

all routes running at localhost:3000 when in development environment

### Profile

-   /profiles/findAll - Returns all profiles in database

-   /profiles/findById/:id - Returns profile with specific id

-   /profiles/createProfile - inserts new profile to db. Send profile to backend in request body with template:
    profile = {
    idprofile: string,
    firstname: string,
    surname: string,
    phone: string,
    description: string,
    whatlookingfor: string,
    fieldOfStudy: string,
    studyYear: number,
    publicity: boolean,
    email: string,
    idschool: number,
    idcity: number,
    picture: string,
    };

## joblisting

-   /joblistings/findAll - returns all joblistings
