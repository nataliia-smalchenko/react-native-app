import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ButtonComponent from "../components/ButtonComponent";

const MapScreen = ({ navigation, route }) => {
  const coords = route?.params?.coords.coords;
  console.log(coords);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Дозвіл на доступ до місцезнаходження відхилено");
      setLocation({
        latitude: 50.4501,
        longitude: 30.5234,
      });
      reverseGeocode(50.4501, 30.5234);
      return;
    }

    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    reverseGeocode(coords.latitude, coords.longitude);
  };

  const reverseGeocode = async (latitude, longitude) => {
    const [result] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    // const name = `${result.country}, ${result.region}${
    //   ", " + result.city || ""
    //   }`
    const name = `${result.country}, ${result.region}`
      .trim()
      .replace(/,\s*$/, "");
    setLocationName(name);
  };

  const handleDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    reverseGeocode(latitude, longitude);
  };

  const handleSelectLocation = () => {
    navigation.navigate("CreatePost", {
      selectedLocation: location,
      locationName: locationName,
    });
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          // initialRegion={{
          //   latitude: location.latitude,
          //   longitude: location.longitude,
          //   latitudeDelta: 0.01,
          //   longitudeDelta: 0.01,
          // }}
          initialRegion={{
            ...coords,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          {/* <Marker coordinate={location} draggable onDragEnd={handleDragEnd} /> */}
          <Marker coordinate={coords} />
        </MapView>
      ) : (
        <Text>Завантаження...</Text>
      )}
      <ButtonComponent
        title="Вибрати локацію"
        style={styles.selectButton}
        onPress={handleSelectLocation}
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
  selectButton: {
    position: "absolute",
    bottom: 20,
    width: "92%",
  },
});

export default MapScreen;
