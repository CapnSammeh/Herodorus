<h1 align="center">🎵Herodorus🎵</h1>
<h2>Spotify Album Art Viewer</h2>
<p>
  <a href="spdx.org/licences/MIT.html" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A beautiful, Single Page App that displays your currently playing, and most played music's album art using the Spotify API

## Install


### Prerequisites:
  - PostgreSQL
    - Databases required for each environment:
      - DEV_Herodorus
      - TEST_Herodorus
      - STAGING_Herodorus
      - PRODUCITON_Herodorus
  
This project uses <a href="https://www.npmjs.com/package/dotenv">DOTENV</a> in order to manage environment parameters. Create a file titled '.env' in the backend directory and fill the following parameters:

```
// Database Config
DEV_DATABASE_URL = 'postgres://[USERNAME]:[PASSWORD]@localhost:5432/DEV_Herodorus'
TEST_DATABASE_URL = 'postgres://[USERNAME]:[PASSWORD]@localhost:5432/TEST_Herodorus'
STAGING_DATABASE_URL = 'postgres://[USERNAME]:[PASSWORD]@localhost:5432/STAGING_Herodorus'
PRODUCTION_DATABASE_URL = 'postgres://[USERNAME]:[PASSWORD]@localhost:5432/PRODUCITON_Herodorus'
SEEDS_DIR

// Spotify Configuration
SPOTIFY_CLIENT_ID = ''
SPOTIFY_CLIENT_SECRET = ''
SPOTIFY_CALLBACK_URL = ''
```

### Install the Project Dependancies
There are two projects reall at hand here, both the Backend and FrontEnd need their own dependencies installed by running the following in their respective root directories:
```
npm install 
```

### Database Setup
Once the required databases have been set up, they need to be initialized using KNEX. From the bakcend directory, run the following:

```
npx knex 
```


## Usage
Ensure that you're running the installation command in both the frontend and backend folders; this is two (2) seperate applications.

## Contributing

### Frontend
When generating frontend components, Generate-React-CLI should be used to maintain the consistency of the directory structure:
```
//Generate a Component
npx generate-react-cli component COMPONENT_NAME

//Generate a Page
npx generate-react-cli component PAGE_NAME --type=page
```

## Author

👤 **Sam Herring**


## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](spdx.org/licences/MIT.html) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_