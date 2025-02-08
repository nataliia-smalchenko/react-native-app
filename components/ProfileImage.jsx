import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddIcon from "../assets/icons/AddIcon";

const ProfileImage = ({ style }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const loadImageUri = async () => {
      const savedUri = await AsyncStorage.getItem("imageUri");
      if (savedUri) {
        setImageUri(savedUri);
      }
    };
    loadImageUri();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem("imageUri", uri);
    }
  };

  const dismissImage = async () => {
    setImageUri(null);
    await AsyncStorage.setItem("imageUri", null);
  };

  const deleteImageStyles = { transform: [{ rotate: "45deg" }] };

  return (
    <View style={[styles.imgWrapper, style]}>
      <Image style={[styles.square]} source={{ uri: imageUri }}></Image>
      <TouchableOpacity onPress={!imageUri ? pickImage : dismissImage}>
        <AddIcon
          style={[styles.icon, imageUri && deleteImageStyles]}
          plusColor={imageUri ? "#BDBDBD" : "#FF6C00"}
          strokeColor={imageUri ? "#E8E8E8" : "#FF6C00"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    flex: 0,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: "translateX(-50%)",
    flexDirection: "row",
  },
  square: {
    flex: 0,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  icon: {
    flex: 0,
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
});

export default ProfileImage;
