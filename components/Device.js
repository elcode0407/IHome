import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import BouncyButton from "../ui/BouncyButton";
import { useDispatch, useSelector } from "react-redux";
import { changeState, removeDevice } from "../redux/device";
import { ref, remove, set } from "firebase/database";
import auth, { database } from "../firebase/firebase";

function Device({ item, roomName }) {
  // Get the navigation object from the react-navigation library
  const navigation = useNavigation();

  // Access the device data from the Redux store based on the room and device name
  const device = useSelector(
    (state) => state.roomsDevices.database.rooms[roomName]?.devices[item.name]
  );

  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // Function to handle device state toggle (on/off)
  async function onPress() {
    if (device.state === "off") {
      // If the device is off, turn it on
      await set(
        ref(
          database,
          auth.currentUser.uid +
            "/rooms/" +
            roomName +
            "/devices/" +
            item.name +
            "/state"
        ),
        "on"
      );

      // Dispatch a Redux action to update the state
      dispatch(
        changeState({
          roomName: roomName,
          deviceName: item.name,
          newState: "on",
        })
      );
    } else {
      // If the device is on, turn it off
      await set(
        ref(
          database,
          auth.currentUser.uid +
            "/rooms/" +
            roomName +
            "/devices/" +
            item.name +
            "/state"
        ),
        "off"
      );

      // Dispatch a Redux action to update the state
      dispatch(
        changeState({
          roomName: roomName,
          deviceName: item.name,
          newState: "off",
        })
      );
    }
  }

  // Function to handle device deletion
  async function onDelete() {
    // Remove the device data from Firebase Realtime Database
    await remove(
      ref(
        database,
        auth.currentUser.uid + "/rooms/" + roomName + "/devices/" + item.name
      )
    );

    // Dispatch a Redux action to remove the device from the store
    dispatch(
      removeDevice({
        roomName: roomName,
        name: item.name,
      })
    );
  }

  return (
    <View>
      {/* Render the device as a BouncyButton */}
      <BouncyButton
        source={
          !!!item.imageOn
            ? item.image
            : { off: item.imageOff, on: item.imageOn }
        }
        style={[
          device?.state !== "off"
            ? { backgroundColor: "#405ef2" }
            : { backgroundColor: "#eff3fc" },
          styles.container,
        ]}
        styleText={styles.deviceName}
        text={item.title}
        onDelete={onDelete}
        onLongPress={() => {
          // Navigate to the DeviceDetails screen when long-pressed (if options are available)
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
          // Toggle the device state when short-pressed
          onPress();
        }}
        isEnabled={device?.state === "off" ? false : true}
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
    marginTop: 10,
    marginLeft: 8,
    marginRight: 1,
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
