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
  // State to control loading state
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // Function to handle user signup
  async function signUp({ email, password, name }) {
    // Set loading state while signup is in progress
    setIsLoading(true);

    try {
      // Create a user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the signed-in user
      const user = userCredential.user;
      console.log(user.uid);

      // Create initial user data in Firebase Realtime Database
      await set(ref(database, `${user.uid}/`), {
        rooms: {
          bedroom1: {
            data: {
              name: "bedroom1",
              title: "Bedroom 1",
              iconName: "bed-king",
            },
            devices: {
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
          },
          bedroom2: {
            data: {
              name: "bedroom2",
              title: "Bedroom 2",
              iconName: "bed-king-outline",
            },
            devices: {
              lamp: {
                imageOff: "lamp-outline",
                imageOn: "lamp",
                name: "lamp",
                state: "off",
                title: "Light",
              },
            },
          },
          kitchen: {
            data: {
              name: "kitchen",
              title: "Kitchen",
              iconName: "silverware-fork-knife",
            },
            devices: {
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
          },
          livingRoom: {
            data: {
              name: "livingRoom",
              title: "Living Room",
              iconName: "sofa",
            },
            devices: {
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
        },
        userData: {
          name: name,
        },
      });

      // Dispatch user authentication action
      dispatch(authenticated({ token: user.uid }));
    } catch (error) {
      // Handle any errors that occur during signup
      const errorCode = error.code;
      const errorMessage = error.message;

      // Set loading state back to false
      setIsLoading(false);

      // Show an alert with the error message
      Alert.alert("Authentication failed!", errorMessage);
    }
  }

  // If loading, display a loading overlay
  if (isLoading) {
    return (
      <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
        <LoadingOverlay message={"Signing Up"} />
      </LinearGradient>
    );
  }

  // If not loading, display the signup form
  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <ScrollView>
        {/* Render the authentication content with the signUp function */}
        <AuthContent onAuthenticate={signUp} />
      </ScrollView>
    </LinearGradient>
  );
}

export default SignupScreen;
