//Imports
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "../Components/axios";
import api from "../../api";

//Constants
const url1 = "https://image.tmdb.org/t/p/w300";

export default function Cast({ id, defaultSrc }) {
  //States
  const [Screen, setScreen] = useState([]);
  const [Load, setLoad] = useState(false);

  //Hooks
  const flatListRef = useRef();

  //Functions
  const castFnc = async () => {
    await axios
      .get(`/movie/${id}/images?api_key=${api}`)
      .then((data) => {
        setScreen(data.data.backdrops);
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };
  const toStart = () => {
    flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
  };

  //On Mount
  useEffect(() => {
    castFnc();
    toStart();
  }, [id]);

  //Consoles
  // console.log(cast);

  //Main Function
  if (Load) {
    return (
      <View style={styles.view}>
        <Text style={styles.castText}> ScreenShots </Text>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={Screen.slice(0, 10)}
            renderItem={({ item }) => {
              const image = {
                uri: `${url1}${item.file_path}`,
              };
              if (item.file_path == null) return null;
              else {
                return <Image source={image} style={styles.cast} />;
              }
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, alignSelf: "center" }}
      />
    );
  }
}

//Styles
const styles = StyleSheet.create({
  cast: {
    height: 120,
    width: 200,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 20,
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "black",
  },
  castText: {
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
  },
  view: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
});
