# WEATHER WEB APP

[Overview](#overview) · [Prerequisites](#prerequisites) · [Start the server](#start-the-aplication)

## Overview

A simple, but useful web application designed for a development challenge. This application uses the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) and [Open Weather API](https://openweathermap.org/api).

<img src="https://i.ibb.co/WgzWzgs/Screenshot-from-2019-11-25-15-42-48.png" alt="app-img" width="500" />

## Prerequisites

### Install the project

Clone this repository:
```bash
git clone https://github.com/fernandaverzbickas/bt-front-challenge.git
```

Install all dependencies at once:
```bash
cd bt-front-challenge && npm install
```
### Create API Keys

To create a Weather Web App, create a free account on the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) and [Open Weather API](https://openweathermap.org/api) and follow the instructions for API Key creation. 

### Configure

Creat a `.env` file  on the `root` folder with the following configuration:

Note that the JSON configuration file can have any name ending with the `.json` extension and must have the following format:

```
\\Your Google API Key
REACT_APP_GOOGLE_API_KEY="xxxxxxxxxxxxxxxxxxxxxx"
\\Your Open Weather API Key
REACT_APP_WEATHER_API_KEY="xxxxxxxxxxxxxxxxxxxxxx"
```
Don't forget to save the file!
That's all you need to start the application!


## Start the application

Start the application in a terminal with:

```bash
npm start
```
