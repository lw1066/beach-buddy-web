# Beach Buddy 🌊

Beach Buddy brings together bathing-water information, pollution risk forecasts, weather, tides and nearby amenities to help people explore swimming spots in England.

**[Open Beach Buddy](https://beachbuddyweb.netlify.app/)**

## About this repository

This repository contains the **public web version** of Beach Buddy, adapted from an existing React Native / Expo mobile project.

The web app is deployed on Netlify and continues to use AWS services for authentication and selected API requests. This repository starts with fresh Git history and excludes the original native project directories and mobile build artifacts.

**Android release work is still pending.** Further platform-specific development, testing and release preparation will then be needed for iOS. This repository is intended for running and developing the web app, rather than producing mobile releases.

## Features

- Interactive map of Environment Agency bathing-water locations.
- Coloured markers showing annual water-quality classifications, with warning markers for increased pollution risk.
- Beach profiles, descriptions and environmental information.
- Pollution risk forecast status and seasonal forecast history where available.
- Current weather and daily forecasts, including temperature, wind, rain probability and UV information.
- Tide predictions using a nearby tidal station.
- Nearby amenities and places, with external map links.
- Account registration and sign-in through Amazon Cognito.
- Responsive information panels and map popups.

Annual water-quality classifications and short-term pollution risk forecasts are shown as distinct information. Coverage and availability vary by location and data provider.

## Technology

| Area | Technology |
|---|---|
| Application | JavaScript, React 18, React Native and React Native Web |
| Framework and build | Expo SDK 52, Metro and Babel |
| Interactive map | Leaflet and React Leaflet |
| Authentication | AWS Amplify and Amazon Cognito |
| Backend | Amazon API Gateway, AWS Lambda, Node.js and Express |
| HTTP requests | Axios and Fetch |
| Local storage | AsyncStorage |
| Hosting and API proxies | Netlify |
| Version control | Git and GitHub |

## APIs and data sources

| Resource | Used for |
|---|---|
| [Environment Agency bathing-water data](https://environment.data.gov.uk/bwq/profiles/) | Locations, profiles, classifications and pollution risk forecasts |
| [Open-Meteo Forecast API](https://open-meteo.com/en/docs) | Weather conditions and forecasts |
| [ADMIRALTY UK Tidal API](https://developer.admiralty.co.uk/) | Tidal event predictions |
| [Geoapify Places API](https://apidocs.geoapify.com/docs/places/) | Nearby amenities and places |
| [OpenStreetMap](https://www.openstreetmap.org/copyright) | Map tiles and underlying map data |

Data and services remain subject to their providers’ terms, attribution requirements and availability.

## How it works

The browser loads the map and requests weather data directly from Open-Meteo. Environment Agency requests use the proxy routes defined in `netlify.toml`.

Users authenticate through Cognito. Authenticated tide and places requests go through API Gateway and Lambda, which call the upstream providers.

The backend source is included under `amplify/`. Deploying the web app to Netlify does **not** deploy or update those AWS resources.

## Run locally

The web app has been built and tested with Node.js 24.

```bash
git clone https://github.com/lw1066/beach-buddy-web.git
cd beach-buddy-web
npm ci
npx --no-install netlify dev
```

Open **http://localhost:8888**.

Use Netlify Dev for local development so the Environment Agency proxy routes work alongside the Expo web server.

### Backend configuration

The checked-in frontend configuration points to the existing Beach Buddy AWS services. A standalone deployment requires your own AWS resources and API subscriptions, together with updates to the frontend configuration and request endpoints.

The included backend source reads these server-side environment variables:

| Variable | Function |
|---|---|
| `ADMIRALTY_API_KEY` | Tidal API requests |
| `geoapifyKey` | Places API requests |

These are backend settings, not frontend environment variables.

## Production build

```bash
npx --no-install expo export --platform web
```

The exported website is written to `dist/`.

Netlify uses the build command, publish directory and proxy rules in `netlify.toml`. Map marker images are served from `public/markers/` using explicit URLs.

## Project structure

| Directory or file | Purpose |
|---|---|
| `App.js` | Application entry and top-level state |
| `components/` | Map, popups, information panels and shared UI |
| `utils/` | API requests, data transformation and forecast logic |
| `public/markers/` | Public web map marker images |
| `assets/` | Images and other application assets |
| `src/` | Amplify configuration and authentication layout |
| `amplify/` | AWS backend source and configuration |
| `netlify.toml` | Web build, development server and proxy configuration |

## Development plans

- Complete the remaining work needed for an Android release.
- Follow with iOS development, device testing and release preparation.
- Continue dependency maintenance, including outstanding Expo tooling audit findings.
- Review backend rate limiting and API quota protection.
- Review tidal-data storage against the applicable subscription terms.
- Remove unused native dependencies from the web version where appropriate.

## Using the information

Beach Buddy is an information project, not a guarantee that a location is safe for swimming. Forecasts and classifications have different reporting periods, and a nearby tidal station may not represent exact conditions at a beach. Check current official advice and local conditions.
