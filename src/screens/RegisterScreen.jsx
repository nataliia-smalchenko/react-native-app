import AuthForm from "../components/AuthForm";
import { Alert, ImageBackground, StyleSheet } from "react-native";
import { validateEmail, validatePassword } from "../helpers/validators";

const RegisterScreen = ({ navigation }) => {
  const handleFormSubmit = (email, password, login) => {
    if (!validateEmail(email)) {
      Alert.alert("Помилка реєстрації", "Некоректний email");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Помилка реєстрації",
        "Неправильний пароль. Пароль має містити мінімум 8 символів, одну велику літеру, одну малу літеру, одну цифру та один спецсимвол (@#$%^&*!)"
      );
      return;
    }

    if (login.length < 3) {
      Alert.alert(
        "Помилка реєстрації",
        "Пароль має містити мінімум 8 символів, одну велику літеру, одну малу літеру, одну цифру та один спецсимвол (@#$%^&*!)"
      );
      return;
    }
    // Alert.alert(
    //   "Реєстрація",
    //   `Вітаємо, ${login}, ви зареєстровані!\n Ваш e-mail: ${email}\n Ваш пароль: ${password}`
    // );

    navigation.replace("Home");
  };

  const toggleForm = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      style={[styles.image]}
      source={require("../assets/images/PhotoBG.png")}
      resizeMode="cover"
    >
      <AuthForm
        isLogin={false}
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
