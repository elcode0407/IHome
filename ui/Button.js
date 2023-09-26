import { Pressable, StyleSheet, View, Text } from "react-native";

function Button({ text, onPress, style, textStyle }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button]}>
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
  },
  flat: {
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 1.5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  flatText: {},
  pressed: {
    opacity: 0.75,

    borderRadius: 4,
  },
});
