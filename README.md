[![CodeQL](https://github.com/wearemarmota/marmota-music-webapp/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/wearemarmota/marmota-music-webapp/actions/workflows/codeql-analysis.yml)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). [Go to his readme](docs/cra.md).

## Marmota Music: Web app

This project is intended to replace the original idea from Google Play Music, where you could upload your music and manage your library on a cloud service. Without ads. Withoud fees.

### About the this repository

This repository is hosting the code for the web app. It can't work standalone, it requires an API running and accesible. This API is also provided on his own repository. 

Go to the [Marmota Music API repository](https://github.com/wearemarmota/marmota-music-api).

### Start running the project

Very first of all, you need to copy the `.env.example` file renaming it to `.env`. Then, update the `REACT_APP_API_BASE_URI` field with the correct value.

To build the project with a different .env file, you can repeat the previous step but renaming the file to `.env.prod`, and then you have two options:

 - Build using `.env` file: `npm run build`.
 - Build using `.env.prod` file: `npm run build:prod`.

 ### Screenshots

 ![Home screenshot 1][home1]
 ![Home screenshot 2][home2]
 ![Album detail screenshot][album]

 [home1]: screenshots/home-1.png "Home screenshot 1"
 [home2]: screenshots/home-2.png "Home screenshot 2"
 [album]: screenshots/album.png "Album detail screenshot"
