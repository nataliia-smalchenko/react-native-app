import { useState } from "react";
import AuthForm from "../components/AuthForm";
import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const RegisterScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleFormSubmit = (login, password) => {
    if (isLogin) {
      Alert.alert("Логін", `Вітаємо, ${login}!`);
    } else {
      Alert.alert("Реєстрація", `Вітаємо, ${login}, ви зареєстровані!`);
    }
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <ImageBackground
      style={[styles.image]}
      source={require("../assets/images/PhotoBG.png")}
      resizeMode="cover"
    >
      <AuthForm
        isLogin={isLogin}
        onSubmit={handleFormSubmit}
        toggleForm={toggleForm}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default RegisterScreen;
