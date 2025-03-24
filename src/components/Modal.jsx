import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { CardTemp } from "./CardTemp.jsx";

const { width } = Dimensions.get("window");

export const Modal = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2E335A", "#1c1b33"]}
        start={{ x: 0.6, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      />
      <View style={styles.handle} />
      <View style={styles.cardsContainer}>
        <CardTemp />
        <CardTemp />
        <CardTemp />
        <CardTemp />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 280,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    alignItems: "center",
    ...Platform.select({
      android: {
        elevation: 20,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOpacity: 0.1,
      },
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.26,
        shadowRadius: 3,
      },
    }),
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.3,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },
  handle: {
    backgroundColor: "#5C599B",
    width: 50,
    height: 5,
    borderRadius: 20,
    marginTop: 16,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 26,
  },
});
