import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Alert } from "react-native";

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
    <AuthForm
      isLogin={isLogin}
      onSubmit={handleFormSubmit}
      toggleForm={toggleForm}
    />
  );
};

export default RegisterScreen;
