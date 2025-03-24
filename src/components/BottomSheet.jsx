import React, { useEffect, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { CardTemp } from "./CardTemp.jsx";
import Widget from "./Widget.jsx";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.1;

export const BottomSheet = ({ pressure, altitude }) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, {
      damping: 50,
      mass: 0.5,
    });
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -SCREEN_HEIGHT / 1.1) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 3, { duration: 500 });
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            paddingTop: 16,
            flexWrap: "wrap",
          }}
        >
          <Widget
            title="TEMPERATURA MAX"
            content="30°"
            width={164}
            height={164}
            center
          />
          <Widget
            title="Humedad MAX"
            content="70%"
            width={164}
            height={164}
            center
          />

          {/*
            Muestra de datos relacionados con el recorrido del carrito seguidor
            aqui se mostraran los datos recopilados sobre su distancia y velocidad
            maxima.
          */}
          <Widget title="Recorrido" width="95%" height={120} paddingDefault>
            <View className="flex flex-row justify-between w-full h-[90%] items-center px-4 mt-2">
              <View className="flex items-center justify-center gap-2">
                <Text className="font-bold text-sm text-white/80 text-center">
                  Distancia
                </Text>
                <Text className="font-bold text-2xl text-white text-center">
                  2.2KM
                </Text>
              </View>
              <View className="flex items-center justify-center gap-2">
                <Text className="font-bold text-sm text-white/80 text-center">
                  Vel MAX
                </Text>
                <Text className="font-bold text-2xl text-white text-center">
                  2.2KM
                </Text>
              </View>
            </View>
          </Widget>

          {/*
            Muestra de datos relacionados con la Barometria con el sensor BM180
            aqui se muestran los datos de ALTITUD, PRESIÓN, etc.
          */}
          <Widget title="Barometria" width="95%" height={120} paddingDefault>
            <View className="flex flex-row justify-between w-full h-[90%] items-center px-4 mt-2">
              <View className="flex items-center justify-center gap-2">
                <Text className="font-bold text-sm text-white/80 text-center">
                  Presión
                </Text>
                <Text className="font-bold text-2xl text-white text-center">
                  {pressure}PA
                </Text>
              </View>
              <View className="flex items-center justify-center gap-2">
                <Text className="font-bold text-sm text-white/80 text-center">
                  Altitud
                </Text>
                <Text className="font-bold text-2xl text-white text-center">
                  {altitude}Mts
                </Text>
              </View>
            </View>
          </Widget>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: "100%",
    top: SCREEN_HEIGHT / 0.9,
    backgroundColor: "transparent",
    borderRadius: 46,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.9,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },
  handle: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 15,
  },
});
