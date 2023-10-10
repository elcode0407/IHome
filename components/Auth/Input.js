import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      {/* Display the label for the input */}
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      {/* Render the text input field */}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "#2613f3", // Color for invalid labels
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#D7DDE9",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "#bfe9fc", // Background color for invalid inputs
  },
});
