import { StyleSheet } from "react-native";

const colors = {
  white: "#FFF",
  subtitle: "#F2F2F2",
  loginColor: "#FEFEFE",
  primary: "#FFC700",
  secondary: "#6C6C6C",
  backgroundColor: "#525252",
  black: "#000",
  detailsText: "#9E9E9E",
  arrow: "#937d1c",
};

const text = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    fontSize: 26,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: -0.2,
    color: colors.white,
    marginBottom: 50,
  },
  regular: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.2,
    color: colors.subtitle,
  },
  primaryText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.2,
    alignItems: "center",
    paddingHorizontal: "24%",
  },
});

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.backgroundColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  mainImage: {
    width: 340,
    height: 252,
  },
  textContainer: {
    paddingHorizontal: 80,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    width: "80%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  arrowContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.arrow,
    flexDirection: "row",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { colors, theme, text };
