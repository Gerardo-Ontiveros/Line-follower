import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import Humidity from "@assets/images/humidity.png";
import Track from "@assets/images/track.png";
import { BottomSheet } from "@components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { db, ref, onValue } from "./src/lib/firebase";

export default function App() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    const dataRef = ref(db, "iot-data/device_ESP32");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setPressure(data.pressure);
      setAltitude(data.altitude);
    });
  }, [db]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#2E335A", "#1c1b33"]}
          start={{ x: 0.9, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.background}
        />
        <View style={{ alignItems: "center", paddingTop: 96 }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            TEMPERATURA
          </Text>
          <Text style={{ color: "white", fontSize: 96, fontWeight: "bold" }}>
            {temperature}°
          </Text>
          {/* 
          Aqui se vera y se actualizara la ultima humedad registrada y enviada
          por el carrito, debera ingresarse en el componente "Text" como
          parametro. 
        */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={Humidity} style={{ width: 50, height: 30 }} />
            <Text style={{ color: "white", fontSize: 20 }}>{humidity}%</Text>
          </View>

          {/*
            Aqui se vera el registro del recorrido que hizo el carrito se 
            trasara en tiempo real en modelado 3D para una mejor visuali-
            zacion.
          */}
          <View style={{ alignItems: "center", paddingTop: 53 }}>
            <Image source={Track} />
          </View>
        </View>
        <BottomSheet pressure={pressure} altitude={altitude} />
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
