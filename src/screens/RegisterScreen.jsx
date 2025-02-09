import { Alert, ImageBackground, StyleSheet } from "react-native";
import { validateEmail, validatePassword } from "../helpers/validators";
import AuthForm from "../components/AuthForm";
import { registerDB } from "../utils/auth";
import { addUser, uploadImage, getImageUrl } from "../utils/firestore";
import { useDispatch, useSelector } from "react-redux";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.user.userInfo);

  const handleFormSubmit = async (email, password, login, file, fileName) => {
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
        "Імʼя користувача має містити мінімум 3 символи"
      );
      return;
    }

    await registerDB({ email, password, login, file, fileName, dispatch });

    // navigation.replace("Home");
  };

  const handleImageUpload = async (userId, file, fileName) => {
    try {
      console.log("FILE", file);

      const imageRef = await uploadImage(userId, file, fileName);

      const imageUrl = await getImageUrl(imageRef);

      console.log("Image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image and getting URL:", error);
    }
  };

  const toggleForm = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      style={[styles.image]}
      source={require("../../assets/images/PhotoBG.png")}
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
