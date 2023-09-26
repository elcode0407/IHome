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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        console.log(user.uid);
        dispatch(authenticated({ token: user.uid }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setIsLoading(false);
        Alert.alert(
          "Authentication failed!",
          "Could not log you in.\n \nPlease check your credentials or try again later!"
        );
      });
  }

  if (isLoading) {
    return (
      <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
        <LoadingOverlay message={"Signing In"} />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient colors={["#D7DDE9", "#ffffff"]} style={{ flex: 1 }}>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </LinearGradient>
  );
}

export default LoginScreen;
