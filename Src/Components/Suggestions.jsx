//Imports
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import axios from "../Components/axios";
import api from "../../api";

//Constants
const url = "https://image.tmdb.org/t/p/w200";

export default function Cast({ id, navigation, screen }) {
  //States
  const [recommend, setrecommend] = useState([]);
  const [Load, setLoad] = useState(false);

  //Hooks
  const flatListRef = useRef();

  //Functions
  const castFnc = async () => {
    await axios
      .get(`/movie/${id}/recommendations?api_key=${api}`)
      .then((data) => {
        setrecommend(data.data.results);
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
        <Text style={styles.castText}> Similar Movies </Text>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={recommend.slice(0, 5)}
          renderItem={({ item }) => {
            const image = {
              uri: `${url}${item.backdrop_path || item.poster_path}`,
            };
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("CardDetail", { data: item });
                }}
                style={styles.viewStyle}
              >
                <Image source={image} style={styles.imageStyle} />
              </Pressable>
            );
          }}
        />
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
  viewStyle: {
    overflow: "hidden",
    height: 120,
    width: 200,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 5,
    marginBottom: 10,
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
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    resizeMode: "cover",
  },
});
