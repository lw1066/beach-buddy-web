const codes = {
    0: {
        conditions: "Clear sky",
        iconPath: require("../assets/weather/sun.png"),
    },
    1: {
        conditions: "Mainly clear",
        iconPath: require("../assets/weather/sun.png"),
    },
    2: {
        conditions: "Partly cloudy",
        iconPath: require("../assets/weather/partly-cloudy.png"),
    },
    3: {
        conditions: "Overcast",
        iconPath: require("../assets/weather/cloud.png"),
    },
    45: {
        conditions: "Fog",
        iconPath: require("../assets/weather/mist-fog.png"),
    },
    48: {
        conditions: "Depositing rime fog",
        iconPath: require("../assets/weather/mist-fog.png"),
    },
    51: {
        conditions: "Light drizzle",
        iconPath: require("../assets/weather/drizzle.png"),
    },
    53: {
        conditions: "Moderate drizzle",
        iconPath: require("../assets/weather/drizzle.png"),
    },
    55: {
        conditions: "Dense drizzle",
        iconPath: require("../assets/weather/drizzle.png"),
    },
    56: {
        conditions: "Light freezing drizzle",
        iconPath: require("../assets/weather/drizzle.png"),
    },
    57: {
        conditions: "Dense freezing drizzle",
        iconPath: require("../assets/weather/drizzle.png"),
    },
    61: {
        conditions: "Light rain",
        iconPath: require("../assets/weather/light-rain.png"),
    },
    63: {
        conditions: "Moderate rain",
        iconPath: require("../assets/weather/rain.png"),
    },
    65: {
        conditions: "Heavy rain",
        iconPath: require("../assets/weather/rain.png"),
    },
    66: {
        conditions: "Light freezing rain",
        iconPath: require("../assets/weather/hail.png"),
    },
    67: {
        conditions: "Heavy freezing rain",
        iconPath: require("../assets/weather/hail.png"),
    },
    71: {
        conditions: "Light snow",
        iconPath: require("../assets/weather/light-snow.png"),
    },
    73: {
        conditions: "Moderate snow",
        iconPath: require("../assets/weather/snow.png"),
    },
    75: {
        conditions: "Heavy snow",
        iconPath: require("../assets/weather/heavy-snow.png"),
    },
    77: {
        conditions: "Snow grains",
        iconPath: require("../assets/weather/snow.png"),
    },
    80: {
        conditions: "Light rain showers",
        iconPath: require("../assets/weather/light-rain.png"),
    },
    81: {
        conditions: "Moderate rain showers",
        iconPath: require("../assets/weather/rain.png"),
    },
    82: {
        conditions: "Violent rain showers",
        iconPath: require("../assets/weather/rain.png"),
    },
    85: {
        conditions: "Light snow showers",
        iconPath: require("../assets/weather/light-snow.png"),
    },
    86: {
        conditions: "Heavy snow showers",
        iconPath: require("../assets/weather/heavy-snow.png"),
    },
};

export const weatherCode = (weatherCode) => {
    return codes[weatherCode];
};
