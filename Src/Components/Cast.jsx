//Imports
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
import api from "../../api";

//Constants
const url1 = "https://image.tmdb.org/t/p/w300";

export default function Cast({ id, defaultSrc }) {
  //States
  const [cast, setcast] = useState([]);
  const [Load, setLoad] = useState(false);

  //Consants
  const castDefault = [
    { id: 1, profile_path: defaultSrc },
    { id: 2, profile_path: defaultSrc },
    { id: 3, profile_path: defaultSrc },
  ];

  //Functions
  const castFnc = async () => {
    await axios
      .get(`/movie/${id}/credits?api_key=${api}`)
      .then((data) => {
        setcast([...data.data.cast, ...castDefault]);
        setLoad(true);
      })
      .catch((err) => {
        setcast(castDefault);
        setLoad(true);
      });
  };

  //On Mount
  useEffect(() => {
    castFnc();
  }, [id]);

  //Consoles
  // console.log(cast);

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
    width: 80,
    height: 80,
    borderRadius: 100,
    marginLeft: 10,
    resizeMode: "cover",
    borderWidth: 1,
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
    marginVertical: 20,
  },
});
