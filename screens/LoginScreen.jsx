import AuthForm from "../components/AuthForm";
import { Alert, ImageBackground, StyleSheet } from "react-native";
import { validateEmail, validatePassword } from "../helpers/validators";

const LoginScreen = ({ navigation }) => {
  const handleFormSubmit = (email, password) => {
    if (!validateEmail(email)) {
      Alert.alert("Помилка входу", "Некоректний email");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Помилка входу",
        "Неправильний пароль. Пароль має містити мінімум 8 символів, одну велику літеру, одну малу літеру, одну цифру та один спецсимвол (@#$%^&*!)"
      );
      return;
    }

    // Alert.alert(
    //   "Логін",
    //   `Вітаємо із входом! Ваш e-mail: \n${email}\n Ваш пароль: ${password}`
    // );
    navigation.replace("Home");
  };

  const toggleForm = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      style={[styles.image]}
      source={require("../assets/images/PhotoBG.png")}
      resizeMode="cover"
    >
      <AuthForm
        isLogin={true}
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

export default LoginScreen;
