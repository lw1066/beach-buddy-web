import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },

  buttonSignout: {
    backgroundColor: "rgba(256,77,71,1)",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    padding: 5,
    fontSize: 14,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  descriptionContainer: {
    padding: 5,
    paddingLeft: 15,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: 12,
    width: "90%",
    marginTop: 15,
  },
  descriptionText: {
    color: "white",
    fontSize: 16,
  },
  detailsButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  details: {
    color: "white",
    padding: 20,
    fontSize: 16,
    backgroundColor: "rgba(1, 1, 1, 0.70)",
    borderRadius: 12,
    margin: 20,
  },
  detailsModal: {
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
    height: "100%",
  },
  flatlistContent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  hamburger: {
    width: 30,
    height: 3,
    backgroundColor: "#005999",
    marginVertical: 3,
  },
  hamburgerButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    zIndex: 9999,
    top: 40,
    right: 20,
    padding: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  hamburgerModal: {
    margin: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: "300%",
    backgroundColor: "rgba(250, 250, 5,0.8)",
    overflow: "hidden",
  },
  hamburgerText: {
    color: "#005999",
  },
  hamburgerDescription: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 15,
  },
  infoModal: {
    alignItems: "center",
    paddingBottom: 20,
    overflow: "hidden",
    height: "100%",
  },
  link: {
    paddingVertical: 5,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  placeContainer: {
    alignItems: "center",
    borderRadius: 12,
    width: "60%",
    margin: 10,
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.70)",
  },
  placeName: {
    color: "white",
    fontWeight: "bold",
  },
  places: {
    color: "white",
    padding: 5,
  },
  placesDetailsModal: {
    width: "100%",
    height: "100%",
  },
  placesListContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: "150%",
    height: "100%",
  },
  // placesScrollView: {
  //   width: "100%",
  // },
  scrollViewContent: {
    height: "300%",
  },
  swimMarker: {
    marginLeft: 3,
    alignItems: "center",
  },
  subTitle: {
    color: "white",
    fontSize: 16,
  },

  title: {
    color: "white",
    paddingVertical: 50,
    fontSize: 32,
    textAlign: "center",
    textWeight: 900,
    margin: 30,
    fontWeight: "600",
  },
  titleContainer: {
    height: 100,
    width: "100%",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
});
