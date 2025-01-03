import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const InputField = ({
  label,
  isPassword,
  onChangeText,
  value,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Функція для перемикання видимості пароля
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.inputContainer}>
      {/* Мітка для поля введення */}
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        {/* Поле введення */}
        <TextInput
          style={[
            styles.input,
            { paddingVertical: isPassword ? 0 : 0.02 * SCREEN_HEIGHT },
          ]}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor="#BDBDBD"
        />

        {/* Кнопка для показу/сховання пароля */}
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.togglePasswordText}>
              {showPassword ? "Сховати" : "Показати"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
  },
  input: {
    fontFamily: "Roboto-Regular",
    flex: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  togglePasswordText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    padding: 0.02 * SCREEN_HEIGHT,
  },
});

export default InputField;
