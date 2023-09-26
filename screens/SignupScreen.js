import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import { authenticated } from "../redux/device";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Alert, ScrollView } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import auth, { app, database } from "../firebase/firebase";
import { LinearGradient } from "expo-linear-gradient";

function SignupScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  async function signUp({ email, password, name }) {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        // ...
        await set(ref(database, `${user.uid}/`), {
          rooms: {
            masterBedroom: {
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
              lamp: {
                imageOff: "lamp-outline",
                imageOn: "lamp",
                name: "lamp",
                state: "off",
                title: "Light",
              },
            },
            guestBedroom: {
              lamp: {
                imageOff: "lamp-outline",
                imageOn: "lamp",
                name: "lamp",
                state: "off",
                title: "Light",
              },
            },
            kitchen: {
              kettle: {
                imageOff: "kettle-outline",
                imageOn: "kettle",
                name: "kettle",
                state: "off",
                title: "Kettle",
              },
              lamp: {
                imageOff: "lamp-outline",
                imageOn: "lamp",
                name: "lamp",
                state: "off",
                title: "Light",
              },
            },
            livingRoom: {
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
            },
          },
          userData: {
            name: name,
          },
        });
        dispatch(authenticated({ token: user.uid }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setIsLoading(false);
        Alert.alert("Authentication failed!", errorMessage);
      });
  }

  if (isLoading) {
    return (
      <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
        <LoadingOverlay message={"Signing Up"} />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <ScrollView>
        <AuthContent onAuthenticate={signUp} />
      </ScrollView>
    </LinearGradient>
  );
}

export default SignupScreen;
