import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      {/* Display a message, if provided */}
      <Text style={styles.message}>{message}</Text>
      {/* Show an activity indicator with a large size */}
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, // Flex to occupy the entire screen
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 32, // Padding around the content
  },
  message: {
    fontSize: 16, // Font size for the message text
    marginBottom: 12, // Margin bottom for spacing
  },
});
