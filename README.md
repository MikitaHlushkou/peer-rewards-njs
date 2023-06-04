# Peer Rewards
This is the project  that allows employees to receive and assign awards.

## Used libraries:

Next.js v13.4 with new App router, Material UI, Moment.js, Radix modal component, Typescript,Tailwind css,Mongoose,Typegoose

## Pre install steps:
* Create .env.local file in the root folder
* Add next env variables:
  * `MONGODB_URI` - connection URI to mongo db
  * `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - OAuth keys that you can get from [here](https://console.cloud.google.com/apis/credentials/oauthclient)
  * `NEXT_PUBLIC_HOST_URL` - The URL where you will deploy your application, for dev needs it can be http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all the dependencies.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Prepare production build

### `npm run start`

Start production build