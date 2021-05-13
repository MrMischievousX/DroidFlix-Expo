import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import * as Font from "expo-font";
const fetchFonts = async () => {
  return Font.loadAsync({
    Netflix1: require("./assets/Fonts/Roboto-Regular.ttf"),
    Netflix2: require("./assets/Fonts/Roboto-Light.ttf"),
  });
};
fetchFonts();
export default function Mainscreen(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/Login_large.jpg")}
      >
        <View style={styles.overlay} />
        <View style={styles.textView}>
          <Text style={styles.text}>Unlimited</Text>
          <Text style={styles.text}>entertainment,</Text>
          <Text style={styles.text}>one low price.</Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Netflix2",
              letterSpacing: 0.5,
              marginVertical: 20,
            }}
          >
            All of DroidFlix, starting at just ₹ 199
          </Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.click(true)}
            >
              <Text style={styles.ButtonView}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  textView: {
    top: "20%",
    textAlign: "center",
    marginTop: 200,
  },
  text: {
    color: "white",
    fontSize: 40,
    fontFamily: "Netflix1",
    letterSpacing: 1,
  },
  ButtonView: {
    color: "white",
    fontSize: 20,
    fontFamily: "Netflix2",
    letterSpacing: 1,
  },
  button: {
    color: "red",
    backgroundColor: "red",
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
});
