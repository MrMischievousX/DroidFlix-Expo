import React from "react";
import { View, Text, Button } from "react-native";

export default function Settings(props) {
  return (
    <View>
      <Text>Setting Screen</Text>
      <Button title="loadScreen" onPress={() => props.click(false)} />
    </View>
  );
}
