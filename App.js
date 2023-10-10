import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import RoomDetails from "./screens/RoomDetails";
import DeviceDetails from "./screens/DeviceDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Device from "./components/Device";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { ref, get, onValue, set, remove } from "firebase/database";
import { authenticated, logout, removeRoom, setData } from "./redux/device";
import auth, { app, database } from "./firebase/firebase";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import IconButton from "./components/ui/IconButton";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import AddRoom from "./screens/AddRoom";
import AddDevice from "./screens/AddDevice";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        {/* обьявляю все screen */}
        <Root />
      </Provider>
    </>
  );
}
function Root() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Пользователь аутентифицирован
        console.log(user.uid + "kdk");
        dispatch(authenticated({ token: user.uid }));
        setIsAuthenticated(true);
      } else {
        // Пользователь не аутентифицирован
        console.log("Пользователь не вошел в систему");
        setIsAuthenticated(true);
      }
    });
    // Отписываемся от события при размонтировании компонента
    return () => unsubscribe();
  }, []);
  return isAuthenticated === null ? <LoadingOverlay /> : <Navigation />;
}
function Navigation() {
  const auth = useSelector((state) => state.roomsDevices);
  console.log(auth.isAuthenticated);
  return (
    <NavigationContainer>
      <Provider store={store}>
        {!auth.isAuthenticated && <AuthStack />}
        {auth.isAuthenticated && <AuthenticatedStack />}
      </Provider>
    </NavigationContainer>
  );
}
function AuthenticatedStack() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.roomsDevices);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const db = ref(database, auth.currentUser.uid + "/");
    async function fetchData() {
      await onValue(
        db,
        (snapshot) => {
          dispatch(setData({ data: snapshot.val() }));
          setIsLoaded(true);
          console.log(data.database);
        },
        {
          onlyOnce: true,
        }
      );
    }
    fetchData();
  }, [dispatch]);
  return !isLoaded ? (
    <LoadingOverlay />
  ) : (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#D7DDE9" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={MainScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: ({ tintColor }) => (
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon={"exit"}
                  color={tintColor}
                  size={24}
                  onPress={() => {
                    dispatch(logout());
                    auth.signOut();
                  }}
                />
                <IconButton
                  icon={"add-circle-outline"}
                  color={tintColor}
                  size={26}
                  onPress={() => {
                    navigation.navigate("AddRoom");
                  }}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="RoomScreen"
          component={RoomDetails}
          options={({ route, navigation }) => ({
            headerRight: ({ tintColor }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton
                  icon={"add-circle-outline"}
                  color={tintColor}
                  size={28}
                  onPress={() => {
                    navigation.navigate("AddDevice", {
                      roomName: route.params.roomName,
                    });
                  }}
                />
                <Ionicons
                  name="remove-circle-outline"
                  color={"red"}
                  size={28}
                  onPress={async () => {
                    await remove(
                      ref(
                        database,
                        auth.currentUser.uid + "/rooms/" + route.params.roomName
                      )
                    );
                    dispatch(
                      removeRoom({
                        name: route.params.roomName,
                      })
                    );
                    navigation.navigate("HomeScreen");
                  }}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen name="DeviceDetails" component={DeviceDetails} />
        <Stack.Screen name="Device" component={Device} />
        <Stack.Screen name="AddRoom" component={AddRoom} />
        <Stack.Screen name="AddDevice" component={AddDevice} />
      </Stack.Navigator>
    </Provider>
  );
}

function AuthStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#D7DDE9" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#f9beda" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
