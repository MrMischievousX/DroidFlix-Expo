import React from "react";
import { View, Text, Button } from "react-native";
export default function LoginScreen({ Login, status }) {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="Logined"
        onPress={() => {
          Login(false);
          status("Login");
        }}
      />
    </View>
  );
}
