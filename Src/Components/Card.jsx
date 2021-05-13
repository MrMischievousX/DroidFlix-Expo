import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import axios from "./axios";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/fonts/Bebas.ttf"),
  });
};
export default function Card({ title, fetchUrl, thumb }) {
  let [movies, setmovies] = useState([]);
  const [Load, setload] = useState(false);
  const url = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    fetchFonts();
    async function getData() {
      let res = await axios.get(fetchUrl + 2);
      let arr = res.data.results;
      res = await axios.get(fetchUrl + 3);
      arr = arr.concat(res.data.results);
      res = await axios.get(fetchUrl + 1);
      arr = arr.concat(res.data.results);
      res = await axios.get(fetchUrl + 4);
      arr = arr.concat(res.data.results);
      setmovies(arr);
      setload(true);
    }
    getData();
  }, [fetchUrl]);
  if (Load) {
    return (
      <>
        <Text style={styles.textStyle}>{title}</Text>
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
              <View style={thumb ? styles.viewStyleThumb : styles.viewStyle}>
                <Image source={image} style={styles.imageStyle} />
              </View>
            );
          }}
        />
      </>
    );
  } else return <AppLoading />;
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
