import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Device from "../components/Device";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import BouncyButton from "../ui/BouncyButton";
import { useEffect } from "react";

function RoomDetails({ route, navigation }) {
  // Set the title for the screen based on the route parameter
  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  // Access the room's devices data from Redux state based on the route parameter
  const roomsDevices = useSelector(
    (state) => state.roomsDevices.database.rooms[route.params.roomName]?.devices
  );

  // Function for rendering each device item
  function renderDeviceItem({ item }) {
    return (
      // Render the Device component with the device details and room name for database access
      <Device item={item} roomName={route.params.roomName} />
    );
  }

  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Devices</Text>

        {/* Render a list of devices in the room */}
        {roomsDevices && (
          <FlatList
            data={Object.values(roomsDevices)}
            renderItem={renderDeviceItem}
            keyExtractor={(item) => Math.random().toString()}
            numColumns={2}
            contentContainerStyle={{
              width: "100%",
            }}
            columnWrapperStyle={{
              justifyContent: "space-around",
            }}
          />
        )}
      </View>
    </LinearGradient>
  );
}

export default RoomDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 16,
    marginBottom: 10,
  },
});
