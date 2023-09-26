import { Text, View, StyleSheet } from "react-native";
import Room from "../components/Room";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
function MainScreen() {
  const userName = useSelector(
    (state) => state.roomsDevices.database.userData?.name
  );
  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <Text style={styles.title}>Welcome, {userName}!</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.roomsContainer}
      >
        {/* создаю комнаты используя компонет Room */}
        <Room name={"bedroom1"} title={"Bedroom 1"} iconName={"bed-king"}>
          Bedroom 1
        </Room>

        <Room name={"livingRoom"} title={"Living Room"} iconName={"sofa"}>
          Living Room
        </Room>
        <Room
          name={"bedroom2"}
          title={"Bedroom 2"}
          iconName={"bed-king-outline"}
        >
          Bedroom 2
        </Room>
        <Room
          name={"kitchen"}
          title={"Kitchen"}
          iconName={"silverware-fork-knife"}
        >
          Kitchen
        </Room>
      </ScrollView>
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
