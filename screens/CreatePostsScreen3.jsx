import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import TrashIcon from "../assets/icons/TrashIcon";
import ButtonComponent from "../components/ButtonComponent";
import CameraIcon from "../assets/icons/CameraIcon";
import MapPinIcon from "../assets/icons/MapPinIcon";

const CreatePostScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
    if (route.params?.locationName) {
      setLocationName(route.params.locationName);
    }

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [route.params?.selectedLocation, route.params?.locationName]);

  const handleCapturePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      setPhoto(photoData.uri);
    }
  };

  const handleLocationPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.photoContainer}>
          {hasPermission ? (
            <Camera
              style={styles.photoPlaceholder}
              ref={(ref) => setCameraRef(ref)}
            >
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={handleCapturePhoto}
              >
                <CameraIcon />
              </TouchableOpacity>
            </Camera>
          ) : (
            <View style={styles.photoPlaceholder}>
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <TouchableOpacity style={styles.cameraIcon}>
                  <CameraIcon />
                </TouchableOpacity>
              )}
            </View>
          )}
          <Text style={styles.uploadText}>Завантажте фото...</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity
          style={styles.locationInputContainer}
          onPress={handleLocationPress}
        >
          <Text style={[styles.input, styles.locationInput]}>
            {locationName || "Місцевість..."}
          </Text>
          <View style={styles.locationIcon}>
            <MapPinIcon />
          </View>
        </TouchableOpacity>
        <ButtonComponent
          title="Опублікувати"
          style={{
            backgroundColor: title && location ? "#ff6600" : "#F6F6F6",
            marginTop: 16,
          }}
          disabled={!title || !location}
          color={title && location ? "#fff" : "#BDBDBD"}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      {!isKeyboardVisible && (
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => navigation.navigate("Home")}
        >
          <TrashIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    width: "100%",
    gap: 16,
  },
  photoContainer: {
    gap: 8,
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  cameraIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },
  uploadText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  input: {
    fontSize: 16,
    fontFamily: "Roboto",
    width: "100%",
    paddingVertical: 13,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  locationInput: {
    paddingLeft: 28,
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    top: 12,
  },
  trashButton: {
    position: "absolute",
    bottom: 56,
    left: "50%",
    transform: [{ translateX: "-35%" }],
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 23,
    paddingVertical: 8,
  },
});

export default CreatePostScreen;
