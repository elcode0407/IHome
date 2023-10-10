import { Pressable, StyleSheet, Text, View } from "react-native";

function Button({ children, onPress }) {
  return (
    <Pressable
      //  Style for the button, with an opacity change when pressed
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        {/* Text inside the button */}
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#2e6be5", // Background color of the button
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7, // Opacity change when button is pressed
  },
  buttonText: {
    textAlign: "center",
    color: "white", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
