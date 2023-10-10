import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Pressable } from "react-native";

function Room({ title, iconName, name, onPress }) {
  // Get navigation object for screen navigation
  const navigation = useNavigation();

  return (
    // When the room is pressed, navigate to the RoomDetails screen with the title and room name
    <Pressable onPress={onPress}>
      <View style={[styles.roomContainer]}>
        {/* Display an icon for the room */}
        <MaterialCommunityIcons
          name={iconName}
          size={70}
          color="#405ef2"
          style={{ marginTop: 20 }}
        />
        {/* Display the room title */}
        <Text style={styles.label}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default Room;

const styles = StyleSheet.create({
  roomContainer: {
    height: "70%",
    width: 250,
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#e4e5ed", // Background color of the room container
    padding: 30, // Padding inside the room container
    margin: 30, // Margin around the room container
    elevation: 3, // Shadow elevation
  },
  label: {
    fontSize: 18,
    fontWeight: "bold", // Styling for the room title
  },
});
