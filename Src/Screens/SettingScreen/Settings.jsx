import React from "react";
import { View, Text, Button } from "react-native";

export default function Settings({ click, dark, current }) {
  return (
    <View>
      <Text>Setting Screen</Text>
      <Button title="loadScreen" onPress={() => click(false)} />
      <Button
        title="Mode Switch"
        onPress={() => {
          dark(!current);
          click(false);
        }}
      />
    </View>
  );
}
