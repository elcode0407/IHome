import { Image, View, Switch, StyleSheet, Text } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOptionState, changeState } from "../redux/device";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "@react-native-assets/slider";
import { ref, set } from "firebase/database";
import auth, { database } from "../firebase/firebase";

function DeviceDetails({ route, navigation }) {
  //обьявляю заголовок

  useEffect(() => {
    navigation.setOptions({
      title: route.params.item.title2,
    });
  }, []);

  const [degree2, setDegree2] = useState();
  const [degree3, setDegree3] = useState();

  // подключаюсь к нужной базе с помошью данныз которые передали из компонента Device
  const device = useSelector(
    (state) =>
      state.roomsDevices.database.rooms[route.params.roomName][
        route.params.item.name
      ]
  );

  useLayoutEffect(() => {
    setDegree2(device?.options?.degree);
    setDegree3(device?.options?.degree);
  }, [degree2, device]);

  const dispatch = useDispatch();
  // нужно что бы понять какое состояние сейчас у кнопки Switch

  let options = <></>;
  if (!!route.params.item?.options) {
    let degree = <></>;

    !!device.options?.degree ? (
      (degree = (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{ fontSize: 25, fontWeight: "bold", marginHorizontal: 15 }}
          >
            {degree3} °C
          </Text>
          <Slider
            value={degree2}
            minimumValue={15}
            maximumValue={31}
            step={1}
            minimumTrackTintColor="#3d62f4"
            thumbTintColor="white"
            thumbStyle={{
              borderRadius: 0,
              height: 20,
              width: 20,
              borderWidth: 0.3,
              borderColor: "black",
            }}
            trackHeight={9}
            trackStyle={{ height: 9 }}
            onValueChange={(value) => {
              setDegree3(value);
            }}
            onSlidingComplete={(value) => {
              dispatch(
                changeOptionState({
                  optionName: "degree",
                  roomName: route.params.roomName,
                  deviceName: route.params.item.name,
                  newState: (+value).toString(),
                })
              );
              set(
                ref(
                  database,
                  auth.currentUser.uid +
                    "/rooms/" +
                    route.params.roomName +
                    "/" +
                    route.params.item.name +
                    "/options/degree"
                ),
                (+value).toString()
              );
            }}
            style={{ minHeight: 30, minWidth: 180 }}
          />
        </View>
      ))
    ) : (
      <></>
    );

    options = <View>{degree}</View>;
  }
  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.device}>
          <MaterialCommunityIcons
            name={route.params.url.url}
            size={70}
            color={"#3d62f4"}
          />
          {options}
          {/* кнопка для выключения или влючения устройства */}
        </View>
      </View>
    </LinearGradient>
  );
}

export default DeviceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  device: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    elevation: 4,
    shadowColor: "gray",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    minHeight: 100,
  },
});
