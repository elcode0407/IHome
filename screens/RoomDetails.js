import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Device from "../components/Device";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import BouncyButton from "../ui/BouncyButton";
import { useEffect } from "react";

function RoomDetails({ route, navigation }) {
  // обьявляю заголовок
  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  // с помошью редукс подключась к нужной базе с данными которые передали из Room
  const roomsDevices = useSelector(
    (state) => state.roomsDevices.database.rooms[route.params.roomName]
  );

  // функция для рендеринга девайсев
  function renderDeviceItem({ item }) {
    return (
      // передаю в компонент девайс url для состояния включения и выключения и имя девайса с комнатой для доступа в базу
      <Device item={item} roomName={route.params.roomName} />
    );
  }

  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Devices</Text>

        {/* лист для отображения всех устройств в комнате */}
        <FlatList
          data={Object.values(roomsDevices)}
          renderItem={renderDeviceItem}
          keyExtractor={(item) => Math.random().toString()}
          numColumns={2}
          contentContainerStyle={{
            flex: 1,

            justifyContent: "space-between",
          }}
        />
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
