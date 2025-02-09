import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonComponent from "../components/ButtonComponent";

const MapScreen = ({ navigation, route }) => {
  const coords = route?.params?.coords;

  return (
    <View style={styles.container}>
      {coords ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...coords,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {coords && coords.latitude && coords.longitude && (
            <Marker coordinate={coords} />
          )}
        </MapView>
      ) : (
        <Text>Завантаження...</Text>
      )}
      <ButtonComponent
        title="Назад"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    width: "92%",
  },
});

export default MapScreen;
