## How to start

### Under server directory

Install npm packages (npm i)

start server with 'npm run dev'

ask for .env file from Kalle

## Routes

all routes running at localhost:3000 when in development environment

### Profiles

#### GET REQUESTS

-   get all profiles: /profiles/
-   get profile by id: /profiles/:id

#### POST REQUESTS

-   post profile: /profiles/
-   find profile by useraccounts email: /profiles/email/
    {
    email: string;
    }

#### PUT REQUESTS

-   update profile by id: /profiles/:id
    {
    firstname: string;
    familyname: string;
    phonenumber: string;
    description: string;
    lookingfor: string;
    studyfield: string;
    yearofstudy: number;
    publicity: boolean | number;
    accountemail: string;
    schoolname: string;
    cityname: string;
    picturelink: string;
    email: string;
    }

#### DELETE REQUESTS

-   delete profile by id: /profiles/:id

## jobadverts

#### GET REQUESTS

-   get all job adverts: /jobadverts/

#### POST REQUESTS

-   post new job advert: /jobadverts/
    {
    advertid: string;
    firstname: string;
    familyname: string;
    company: string;
    startdate: string;
    enddate: string;
    email: string;
    phonenumber: string;
    jobtitle: string;
    description: string;
    salary: string;
    validuntil: string;
    isvalid: boolean;
    accepted: boolean;
    city: string;
    }

#### PUT REQUESTS

#### DELETE REQUESTS

## users

#### POST REQUESTS

-   sign up new user: /users/signup
    {
    email: string;
    admin: boolean;
    schoolid: number;
    password: string;
    }
-   sign in user: /users/signin
    {
    email: string;
    password: string;
    }
-   resend confirmation link to email: /users/resend
    {
    email: string;

    }

-   sign user out: /users/signout
    {
    email: string;

    }

## cities

#### GET REQUESTS

-   get all cities: /cities/
-   get city by name: /cities/:name

## links

#### GET REQUESTS

-   get links profiles links by profile id: /links/:profileid

#### PUT REQUESTS

-   update profiles links by profile id: /links/:profileid
    {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
    cv: string;
    portfolio: string;
    github: string;
    }

## schools

#### GET REQUESTS

-   get all schools: /schools/
-   get school by name: /schools/:name

## images

#### GET REQUESTS

-   get profiles image by profile id: /images/:id

#### POST REQUESTS

-   post picture to profile: /images/:id

## skills

#### GET REQUESTS

-   get all skills: /skills/
-   get profiles skills by profile id: /skills/profile/:id

#### POST REQUESTS

-   add new skill to profile: /skills/profile/:profileid/:skillname
