import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Image,
  Switch,
} from "react-native";

class BouncyButton extends Component {
  constructor() {
    super();
    this.scaleValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.scaleValue, {
      toValue: 0.9,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const scale = this.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const {
      isEnabled,
      onShortPress,
      onLongPress,
      text,
      style,
      source,
      styleText,
    } = this.props;

    let iconName = isEnabled ? source?.on : source?.off;
    if (!!!source?.on) {
      iconName = source;
    }

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPress={onShortPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onLongPress={onLongPress}
          style={[style, isEnabled ? { elevation: 20 } : {}]}
          activeOpacity={1}
        >
          <View style={{ alignItems: "center", padding: 10 }}>
            <View>
              <MaterialCommunityIcons
                name={iconName}
                size={40}
                color={!isEnabled ? "#3d62f4" : "white"}
              />
            </View>
            <View>
              <Text style={[styleText, isEnabled && { color: "white" }]}>
                {text}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.switch}>
              <Text
                style={[
                  styles.textState,
                  !isEnabled ? { color: "#3d62f4" } : { color: "white" },
                ]}
              >
                {isEnabled ? "ON" : "OFF"}
              </Text>
              <Switch
                trackColor={{ false: "#3d62f4", true: "#122d98" }}
                thumbColor={"white"}
                ios_backgroundColor="#3d62f4"
                onValueChange={onShortPress}
                value={isEnabled}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default BouncyButton;
const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  textState: {
    fontSize: 13,
    marginHorizontal: 4,
  },
  buttonContainer: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
