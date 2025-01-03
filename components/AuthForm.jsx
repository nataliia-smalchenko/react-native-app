import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import InputField from "./InputField";
import ButtonComponent from "./ButtonComponent";
import AddIcon from "../assets/icons/AddIcon";

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

  const handleSubmit = () => {
    if (!login || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
      return;
    }
    onSubmit(login, password);
  };

  return (
    <ImageBackground
      style={[styles.image]}
      source={require("../assets/images/PhotoBG.png")}
      resizeMode="cover"
    >
      <View
        style={[
          styles.form,
          {
            paddingTop: isLogin ? 0 : 60,
          },
        ]}
      >
        {!isLogin && (
          <View style={styles.imgWrapper}>
            <View style={[styles.square]}></View>
            <TouchableOpacity>
              <AddIcon style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <View style={styles.container}>
            <Text style={styles.header}>
              {isLogin ? "Увійти" : "Реєстрація"}
            </Text>
            <KeyboardAvoidingView style={styles.inputsContainer}>
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
              />
              <InputField
                isPassword={true}
                placeholder="Пароль"
                value={password}
                onChangeText={handlePasswordChange}
              />
            </KeyboardAvoidingView>

            <ButtonComponent
              title={isLogin ? "Увійти" : "Зареєструватися"}
              onPress={handleSubmit}
              style={styles.buttonStyle}
            />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Немає акаунту?" : "Вже є акаунт?"}
            </Text>
            <TouchableOpacity onPress={toggleForm}>
              <Text style={styles.toggleText}>
                {isLogin ? " Зареєструватися" : " Увійти"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0.05 * SCREEN_HEIGHT,
    position: "relative",
  },
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
