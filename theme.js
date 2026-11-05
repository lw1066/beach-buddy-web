function getTheme() {
  const theme = {
    name: "Custom Theme",
    tokens: {
      colors: {
        background: {
          primary: "yellow",
        },
        font: {
          primary: "#005999",
          secondary: "#005999",
          interactive: "#005999",
        },
      },
    },
  };

  return theme;
}

export default getTheme;
