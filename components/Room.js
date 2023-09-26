import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Pressable } from "react-native";

function Room({ title, iconName, name }) {
  const navigation = useNavigation();
  return (
    // при нажатии на комнату передаю в RoomDetails заголовок и имя комнаты
    <Pressable
      onPress={() => {
        navigation.navigate("RoomScreen", {
          title: title,
          roomName: name,
        });
      }}
    >
      <View style={[styles.roomContainer]}>
        <MaterialCommunityIcons
          name={iconName}
          size={70}
          color="#405ef2"
          style={{ marginTop: 20 }}
        />
        <Text style={styles.label}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default Room;

const styles = StyleSheet.create({
  roomContainer: {
    height: "65%",
    width: 250,
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#e4e5ed",
    padding: 30,
    margin: 30,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
