import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import BouncyButton from "../ui/BouncyButton";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../redux/device";
import { ref, set } from "firebase/database";
import auth, { database } from "../firebase/firebase";

function Device({ item, roomName }) {
  const navigation = useNavigation();
  const device = useSelector(
    (state) => state.roomsDevices.database.rooms[roomName][item.name]
  );

  const dispatch = useDispatch();
  async function onPress() {
    if (device.state === "off") {
      // если выключен то включаю с помошью функции которое я обьявил в Slice
      set(
        ref(
          database,
          auth.currentUser.uid +
            "/rooms/" +
            roomName +
            "/" +
            item.name +
            "/state"
        ),
        "on"
      );

      dispatch(
        changeState({
          roomName: roomName,
          deviceName: item.name,
          newState: "on",
        })
      );
    } else {
      set(
        ref(
          database,
          auth.currentUser.uid +
            "/rooms/" +
            roomName +
            "/" +
            item.name +
            "/state"
        ),
        "off"
      );
      // если включен то выключаю с помошью функции которое я обьявил в Slice
      dispatch(
        changeState({
          roomName: roomName,
          deviceName: item.name,
          newState: "off",
        })
      );
    }
  }

  return (
    // при нажатии на девайс ,перехожу в его страницу передавая имя устройства и комнату ,опять же для доступа к базе

    <View>
      <BouncyButton
        source={
          !!!item.imageOn
            ? item.image
            : { off: item.imageOff, on: item.imageOn }
        }
        style={[
          device.state !== "off"
            ? { backgroundColor: "#405ef2" }
            : { backgroundColor: "#eff3fc" },
          styles.container,
        ]}
        styleText={styles.deviceName}
        text={item.title}
        onLongPress={() => {
          !!item?.options
            ? navigation.navigate("DeviceDetails", {
                item: item,
                roomName: roomName,
                url: !!!item.imageOn
                  ? { url: item.image }
                  : { url: item.imageOn },
              })
            : {};
        }}
        onShortPress={() => {
          onPress();
        }}
        isEnabled={device.state === "off" ? false : true}
      />
    </View>
  );
}

export default Device;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#b7ced9",
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  containerOn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  deviceName: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 11,
  },
});
