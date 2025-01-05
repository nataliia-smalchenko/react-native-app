import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import AuthForm from "./components/AuthForm"; // Імпортуємо компонент форми
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import RegisterScreen from "./screens/RegisterScreen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <RegisterScreen />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
