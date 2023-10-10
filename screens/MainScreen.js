import { Text, View, StyleSheet } from "react-native";
import Room from "../components/Room";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";

function MainScreen({ navigation }) {
  // Get the user's name from Redux state
  const userName = useSelector(
    (state) => state.roomsDevices.database.userData?.name
  );

  // Get the room data from Redux state
  const roomsData = useSelector((state) => state.roomsDevices.database.rooms);

  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      {/* Display a welcome message with the user's name */}
      <Text style={styles.title}>Welcome, {userName}!</Text>

      {/* Render a horizontal list of rooms */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.roomsContainer}
        data={Object.values(roomsData)}
        keyExtractor={(item) => item.data.name}
        renderItem={({ item }) => (
          <Room
            name={item.data.name}
            title={item.data.title}
            iconName={item.data.iconName}
            onPress={() => {
              // Navigate to the RoomScreen with room details
              navigation.navigate("RoomScreen", {
                title: item.data.title,
                roomName: item.data.name,
              });
            }}
          >
            {item.data.title}
          </Room>
        )}
      />
    </LinearGradient>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  roomsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
});
