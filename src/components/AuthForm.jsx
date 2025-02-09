import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

import InputField from "./InputField";
import ButtonComponent from "./ButtonComponent";
import ProfileImage from "./ProfileImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const AuthForm = ({ isLogin, onSubmit, toggleForm }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLoginChange = (text) => {
    setLogin(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !login)) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
      return;
    }
    if (isLogin) {
      onSubmit(email, password);
    } else {
      const imageUri = await AsyncStorage.getItem("imageUri");

      const response = await fetch(imageUri);
      const file = await response.blob();

      const fileName = imageUri.split("/").pop() || "123";
      console.log("FILENAME", fileName);
      const fileType = file.type;

      const imageFile = new File([file], fileName, { type: fileType });

      onSubmit(email, password, login, imageFile, fileName);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.form,
            {
              paddingTop: isLogin ? 0 : 60,
            },
          ]}
        >
          {!isLogin && <ProfileImage />}
          <View style={styles.container}>
            <Text style={styles.header}>
              {isLogin ? "Увійти" : "Реєстрація"}
            </Text>
            <View style={styles.inputsContainer}>
              {!isLogin && (
                <InputField
                  placeholder="Логін"
                  value={login}
                  onChangeText={handleLoginChange}
                  isPassword={false}
                />
              )}
              <InputField
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={handleEmailChange}
                isPassword={false}
                autoComplete="email"
                textContentType="emailAddress"
                importantForAutofill="yes"
              />
              <InputField
                isPassword={true}
                placeholder="Пароль"
                value={password}
                onChangeText={handlePasswordChange}
                autoComplete="password"
                textContentType="password"
                importantForAutofill="yes"
              />
            </View>

            <ButtonComponent
              title={isLogin ? "Увійти" : "Зареєструватися"}
              onPress={handleSubmit}
              style={styles.buttonStyle}
            />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Немає акаунту? " : "Вже є акаунт? "}
            </Text>
            <TouchableOpacity onPress={toggleForm}>
              <Text
                style={[styles.toggleText, { textDecorationLine: "underline" }]}
              >
                {isLogin ? "Зареєструватися" : "Увійти"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    minHeight: "50%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0.07 * SCREEN_HEIGHT,
    position: "relative",
  },
  header: {
    color: "#212121",
    fontSize: 30,
    width: "100%",
    flex: 0,
    marginTop: 0.04 * SCREEN_HEIGHT,
    marginBottom: 0.04 * SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "stretch",
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 0.04 * SCREEN_HEIGHT,
  },
  container: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  toggleContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default AuthForm;
