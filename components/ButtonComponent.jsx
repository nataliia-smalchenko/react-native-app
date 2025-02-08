import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonComponent = ({ onPress, title, style, disabled, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled ? true : false}
    >
      <Text style={[styles.buttonText, { color: color || "#fff" }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default ButtonComponent;
