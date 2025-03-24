import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import Humidity from "@assets/images/humidity.png";

export const CardTemp = () => {
  return (
    <View
      style={[
        styles.shadowContainer,
        styles.box,
        {
          width: 60,
          height: 110,
          borderRadius: 30,
          backgroundColor: "rgba(72, 49, 157, 0.20)",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 8,
          paddingLeft: 8,
          gap: 16,
        },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={Humidity} style={{ width: 50, height: 30 }} />
        <Text style={{ color: "white" }}>50%</Text>
      </View>
      <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
        19º
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 50,
      },
    }),
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 0,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
