import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, FlatList, Image } from "react-native";
import axios from "./axios";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};
export default function Card({ title, fetchUrl, thumb, mode, navigation }) {
  let [movies, setmovies] = useState([]);
  const [Load, setload] = useState(false);
  const url = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    fetchFonts();
  }, []);
  async function getData() {
    let res = await axios.get(fetchUrl + 2);
    let arr = res.data.results;
    res = await axios.get(fetchUrl + 3);
    arr = arr.concat(res.data.results);
    res = await axios.get(fetchUrl + 1);
    arr = arr.concat(res.data.results);
    res = await axios.get(fetchUrl + 4);
    arr = arr.concat(res.data.results);
    res = await axios.get(fetchUrl + 6);
    arr = arr.concat(res.data.results);
    res = await axios.get(fetchUrl + 5);
    arr = arr.concat(res.data.results);
    setmovies(arr);
  }
  if (Load) {
    return (
      <>
        <Text style={mode ? styles.textStyle : Light.textStyle}>{title}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={movies}
          renderItem={({ item }) => {
            const image = {
              uri: `${url}${
                thumb
                  ? item.poster_path
                  : item.backdrop_path || item.poster_path
              }`,
            };
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("CardDetail");
                  console.log("press");
                }}
                style={
                  thumb
                    ? mode
                      ? styles.viewStyleThumb
                      : Light.viewStyleThumb
                    : mode
                    ? styles.viewStyle
                    : Light.viewStyle
                }
              >
                <Image
                  source={image}
                  style={mode ? styles.imageStyle : Light.imageStyle}
                />
              </Pressable>
            );
          }}
        />
      </>
    );
  } else
    return (
      <AppLoading
        startAsync={getData}
        onFinish={() => setload(true)}
        onError={console.warn}
      />
    );
}

const styles = StyleSheet.create({
  viewStyleThumb: {
    height: 180,
    width: 120,
    borderRadius: 12,
    borderWidth: 0.1,
    borderColor: "white",
    marginHorizontal: 5,
    marginBottom: 10,
  },

  viewStyle: {
    height: 120,
    width: 200,
    borderRadius: 12,
    borderWidth: 0.001,
    borderColor: "white",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    marginBottom: 4,
    fontFamily: "Bebas",
    letterSpacing: 1,
  },
  imageStyle: {
    flex: 1,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
const Light = StyleSheet.create({
  viewStyleThumb: {
    height: 180,
    width: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
    marginBottom: 10,
  },

  viewStyle: {
    height: 120,
    width: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
    marginBottom: 4,
    fontFamily: "Bebas",
    letterSpacing: 1,
  },
  imageStyle: {
    flex: 1,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
