import { useState } from "react";
import { Alert } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { useDispatch } from "react-redux";
import { authenticated } from "../redux/device";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth, { app } from "../firebase/firebase";
import { getDatabase } from "firebase/database";
import { LinearGradient } from "expo-linear-gradient";

function LoginScreen() {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Function to handle user login
  async function loginHandler({ email, password }) {
    setIsLoading(true);

    // Attempt to sign in with provided email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully, get user information
        const user = userCredential.user;
        // Dispatch user token to Redux
        dispatch(authenticated({ token: user.uid }));
      })
      .catch((error) => {
        // Handle authentication errors
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false);
        Alert.alert(
          "Authentication failed!",
          "Could not log you in.\n \nPlease check your credentials or try again later!"
        );
      });
  }

  // Render loading overlay while the login is in progress
  if (isLoading) {
    return (
      <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
        <LoadingOverlay message={"Signing In"} />
      </LinearGradient>
    );
  }

  // Render the login form if not loading
  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </LinearGradient>
  );
}

export default LoginScreen;
