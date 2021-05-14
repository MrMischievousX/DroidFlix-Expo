import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "../Components/axios";

//Constants

export default function Cast({ id, defaultSrc }) {
  //Constants
  const [cast, setcast] = useState([]);
  const [Load, setLoad] = useState(false);
  const url1 = "https://image.tmdb.org/t/p/original";
  const castDefault = [
    { id: 1, profile_path: defaultSrc },
    { id: 2, profile_path: defaultSrc },
    { id: 3, profile_path: defaultSrc },
    { id: 4, profile_path: defaultSrc },
  ];

  //Functions
  const castFnc = async () => {
    await axios
      .get(`/movie/${id}/credits?api_key=e057c1c54b5e1bad35cdc1d8d3152acf`)
      .then((data) => {
        if (data.length == 0) setcast(castDefault);
        else setcast(data.data.cast);
        setLoad(true);
      });
  };

  //On Mount
  useEffect(() => {
    castFnc();
  }, []);

  //Consoles
  console.log(cast);
  //Main Function
  if (Load) {
    return (
      <View style={styles.view}>
        <Text style={styles.castText}> Cast </Text>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={cast.slice(0, 10)}
            renderItem={({ item }) => {
              const image = {
                uri: `${url1}${item.profile_path}`,
              };
              if (item.profile_path == null) return null;
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
const styles = StyleSheet.create({
  cast: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 10,
    resizeMode: "cover",
  },
  castText: {
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  view: {
    alignSelf: "flex-start",
    marginVertical: 20,
  },
});
