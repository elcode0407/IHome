import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input";

import { addRoom } from "../redux/device";
import { ref, set } from "firebase/database";
import auth, { database } from "../firebase/firebase";
import DropDownPicker from "react-native-dropdown-picker";

function AddRoom({ navigation }) {
  // State variables for room name, input validation, and dropdown selection
  const [roomName, setRoomName] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
  });
  const [selectedOption, setSelectedOption] = useState("");

  // Options for room types and their corresponding icons
  const options = ["Living Room", "Bedroom", "Kitchen"];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Living Room", value: "livingRoom" },
    { label: "Bedroom", value: "bedroom" },
    { label: "Kitchen", value: "kitchen" },
  ]);
  const icons = {
    livingRoom: {
      iconName: "sofa",
    },
    bedroom: {
      iconName: "bed-king",
    },
    kitchen: {
      iconName: "silverware-fork-knife",
    },
  };

  // Redux dispatch function
  const dispatch = useDispatch();

  // Access room data from Redux store
  const data = useSelector((state) => state.roomsDevices.database.rooms);

  // Function to update the room name input value
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setRoomName(enteredValue);
        break;
    }
  }

  // Function to handle form submission
  async function submitHandler() {
    const nameIsValid = roomName.trim().length > 15;
    const name = roomName.replace(/\s+/g, "");

    // Check if a room with the same name already exists
    if (!!data[name]) {
      if (!name) {
        Alert.alert("Invalid input", "Please enter a room name.");
        return;
      }

      if (nameIsValid) {
        Alert.alert(
          "Invalid input",
          "Room name should be 15 characters or less."
        );
        setCredentialsInvalid({
          name: !nameIsValid,
        });
        return;
      }
      Alert.alert("Invalid input", "Room with this name already exists.");
      return;
    }

    // Get the icon name based on the selected room type
    const iconName = icons[value].iconName;

    // Create the room data object
    const roomData = {
      data: {
        name: name,
        title: roomName,
        iconName: iconName,
      },
      devices: {},
    };

    // Set the room data in Firebase Realtime Database
    await set(ref(database, auth.currentUser.uid + `/rooms/${name}`), roomData);

    // Dispatch a Redux action to add the room to the store
    dispatch(
      addRoom({
        data: {
          roomData: roomData,
          name: name,
        },
      })
    );

    // Navigate back to the home screen
    navigation.navigate("HomeScreen");
  }

  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Room</Text>
        <View>
          {/* Input field for room name */}
          <Input
            label="Room Name"
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={roomName}
            isInvalid={credentialsInvalid.name}
          />

          {/* Dropdown picker for selecting a room type */}
          <DropDownPicker
            placeholder="Select Room Type"
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
          <Button onPress={submitHandler}>Add Room</Button>
        </View>
      </View>
    </LinearGradient>
  );
}

export default AddRoom;

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
