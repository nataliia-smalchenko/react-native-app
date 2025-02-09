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
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import ButtonComponent from "../components/ButtonComponent";
import TrashIcon from "../../assets/icons/TrashIcon";
import CameraIcon from "../../assets/icons/CameraIcon";
import MapPinIcon from "../../assets/icons/MapPinIcon";
import { useSelector } from "react-redux";
import { addPost, getImageUrl, uploadImage } from "../utils/firestore";

const CreatePostScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  // const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [status, requestPermission] = useCameraPermissions();
  const user = useSelector((state) => state.user.userInfo);

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
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      setPhoto(photoData.uri);
      await MediaLibrary.saveToLibraryAsync(photo);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const [result] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const name = `${result.country}, ${result.region}`
      .trim()
      .replace(/,\s*$/, "");
    setLocationName(name);
  };

  const handleLocationPress = async () => {
    console.log("CHOOSE LOCATION");
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Доступ до місцезнаходження",
        "Дозвіл на доступ до місцезнаходження необхідний. Будь ласка, надайте дозвіл.",
        [
          { text: "Скасувати", style: "cancel" },
          {
            text: "Надати дозвіл",
            onPress: async () => {
              const { status: newStatus } =
                await Location.requestForegroundPermissionsAsync();
              if (newStatus === "granted") {
                const { coords } = await Location.getCurrentPositionAsync({});
                setLocation({
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                });
                reverseGeocode(coords.latitude, coords.longitude);
              } else {
                Alert.alert(
                  "Доступ до місцезнаходження відхилено",
                  "Ви не надали дозвіл на доступ до місцезнаходження. Спробуйте ще раз."
                );
              }
            },
          },
        ]
      );
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    console.log("COORDS", coords);
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    await reverseGeocode(coords.latitude, coords.longitude);
  };

  const handleTrashPress = () => {
    setPhoto(null);
  };

  // useEffect(() => {
  //   console.log("Photo value changed:", photo);
  // }, [photo]);

  const handlePublish = async () => {
    // await handleLocationPress();

    const response = await fetch(photo);
    const file = await response.blob();

    const fileName = photo.split("/").pop() || "123";
    console.log("FILENAME", fileName);
    const fileType = file.type;

    const imageFile = new File([file], fileName, { type: fileType });
    console.log("USER", user.uid);

    const imageRef = await uploadImage(
      user.uid,
      imageFile,
      fileName,
      "postPhotos"
    );
    console.log("IMAGE REF", imageRef);

    const imageUrl = await getImageUrl(imageRef);
    console.log("IMAGE URL", imageUrl);

    await addPost(user.uid, {
      title,
      imageUrl,
      location,
      locationName,
      likes: 0,
      comments: [],
    });

    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.photoContainer}>
          {status ? (
            <>
              {!photo ? (
                <CameraView
                  style={styles.photoPlaceholder}
                  ref={(ref) => setCameraRef(ref)}
                  // ref={cameraRef}
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
          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.uploadText}>
              {photo ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </TouchableOpacity>
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
            backgroundColor: title && photo && location ? "#ff6600" : "#F6F6F6",
            marginTop: 16,
          }}
          disabled={!title || !photo || !location}
          color={title && photo && location ? "#fff" : "#BDBDBD"}
          onPress={handlePublish}
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
    bottom: 32,
    left: "50%",
    transform: [{ translateX: -20 }],
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 23,
    paddingVertical: 8,
  },
});

export default CreatePostScreen;
