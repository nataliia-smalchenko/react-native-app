import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store from "./src/redux/store/store";
import { authStateChanged } from "./src/utils/auth";

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
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={store.persistor}
      >
        {/* <NavigationContainer>
          <StackNavigator />
        </NavigationContainer> */}
        <AuthListener />
      </PersistGate>
    </Provider>
  );
};

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
