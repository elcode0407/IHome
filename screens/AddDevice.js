import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button";

import { addDevice } from "../redux/device";
import { ref, set } from "firebase/database";
import auth, { database } from "../firebase/firebase";
import DropDownPicker from "react-native-dropdown-picker";

function AddDevice({ route, navigation }) {
  // Get the room name from the navigation route
  const roomName = route.params.roomName;

  // State variables for the selected device and dropdown
  const [selectedOption, setSelectedOption] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Lamp", value: "lamp" },
    { label: "TV", value: "tv" },
    { label: "Kettle", value: "kettle" },
    { label: "Air Conditioner", value: "airConditioner" },
  ]);

  // Define the available device options and their configurations
  const devices = {
    lamp: {
      imageOff: "lamp-outline",
      imageOn: "lamp",
      name: "lamp",
      state: "off",
      title: "Light",
    },
    tv: {
      image: "youtube-tv",
      name: "tv",
      state: "off",
      title: "TV",
    },
    kettle: {
      imageOff: "kettle-outline",
      imageOn: "kettle",
      name: "kettle",
      state: "off",
      title: "Kettle",
    },
    airConditioner: {
      image: "air-conditioner",
      name: "airConditioner",
      options: {
        degree: "16",
      },
      state: "off",
      title: "Air  Con...",
      title2: "Air Conditioner",
    },
  };

  // Redux dispatch function
  const dispatch = useDispatch();

  // Access room data from Redux store
  const data = useSelector(
    (state) => state.roomsDevices.database.rooms[roomName]
  );

  // Function to handle form submission
  async function submitHandler() {
    // Check if a device is selected
    if (!!value) {
      const device = devices[value];
      if (!!data?.devices) {
        if (!!data?.devices[device.name]) {
          // If a device with the same name already exists, append a random string to its name
          device.name = device.name + Math.random().toString().replace(".", "");
        }

        // Dispatch a Redux action to add the device to the store
        dispatch(
          addDevice({
            data: {
              data: devices[value],
              name: device.name,
              roomName: roomName,
            },
          })
        );

        // Add the device to Firebase Realtime Database
        await set(
          ref(
            database,
            auth.currentUser.uid + `/rooms/${roomName}/devices/${device.name}`
          ),
          devices[value]
        );

        // Navigate back to the previous screen
        navigation.goBack();
      } else {
        // If there are no devices in the room, simply add the device
        dispatch(
          addDevice({
            data: {
              data: devices[value],
              name: device.name,
              roomName: roomName,
            },
          })
        );

        // Add the device to Firebase Realtime Database
        await set(
          ref(
            database,
            auth.currentUser.uid + `/rooms/${roomName}/devices/${device.name}`
          ),
          devices[value]
        );

        // Navigate back to the previous screen
        navigation.goBack();
      }
    } else {
      // Display an alert if no device is selected
      Alert.alert("Please Select a device");
    }
  }

  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Device</Text>
        <View>
          {/* Dropdown picker for selecting a device */}
          <DropDownPicker
            placeholder="Choose device"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={styles.buttons}>
          {/* Submit button */}
          <Button onPress={submitHandler}>Submit</Button>
        </View>
      </View>
    </LinearGradient>
  );
}

export default AddDevice;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#94b2ec",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    margin: 9,
  },
  buttons: {
    marginTop: 12,
  },
  dropdownContainer: {
    width: 200,
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  inputContainerStyle: {
    borderBottomColor: "transparent",
  },
  itemTextStyle: {
    fontSize: 16,
  },
});
