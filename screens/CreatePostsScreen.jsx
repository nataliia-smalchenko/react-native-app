import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
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
  // const [cameraRef, setCameraRef] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [status, requestPermission] = useCameraPermissions();

  useEffect(() => {
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

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert("Permission to access camera was denied");
      }
    })();
  }, []);

  const handleCapturePhoto = async () => {
    // if (cameraRef) {
    //   const photoData = await cameraRef.takePictureAsync();
    //   setPhoto(photoData.uri);
    // }
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          qualityPrioritization: "speed",
          flash: "off",
        });

        setPhoto(photo.path);
      } catch (error) {
        console.error("Помилка при зйомці фото:", error);
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      }
    }
  };

  const handleLocationPress = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   return;
    // }
    // let location = await Location.getCurrentPositionAsync({});
    // setLocation(location.coords);
    navigation.navigate("MapScreen");
  };

  const handleTrashPress = () => {
    setPhoto(null);
  };
  useEffect(() => {
    console.log("Photo value changed:", photo);
  }, [photo]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.photoContainer}>
          {status ? (
            <>
              {!photo ? (
                <CameraView
                  style={styles.photoPlaceholder}
                  // ref={(ref) => setCameraRef(ref)}
                  ref={cameraRef}
                >
                  <Pressable
                    style={styles.cameraIconActive}
                    onPress={handleCapturePhoto}
                  >
                    <CameraIcon fill="#fff" />
                  </Pressable>
                </CameraView>
              ) : (
                <Image
                  source={{ uri: photo }}
                  style={{
                    ...styles.photoPlaceholder,
                    // position: "absolute",
                    // top: 0,
                    // left: 0,
                  }}
                />
              )}
            </>
          ) : (
            <>
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={[
                    styles.photoPlaceholder,
                    { width: "100%", height: "100%" },
                  ]}
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <TouchableOpacity style={styles.cameraIcon}>
                    <CameraIcon />
                  </TouchableOpacity>
                </View>
              )}
            </>
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
          style={[
            styles.trashButton,
            { backgroundColor: photo === null ? "#F6F6F6" : "#FF6C00" },
          ]}
          onPress={handleTrashPress}
          disabled={photo === null}
        >
          <TrashIcon color={photo === null ? "#BDBDBD" : "#FFF"} />
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
  cameraIconActive: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff4d",
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
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
