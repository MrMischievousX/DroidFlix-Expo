//Imports
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import MovieCard from "../../Components/MovieCard";
import axios from "../../Components/axios";
import request from "../../Components/request";
import { LinearGradient } from "expo-linear-gradient";

export default function Homescreen({ navigation, current }) {
  //States
  const [data, setdata] = useState([]);
  const [Load, setload] = useState(false);
  const [Dark, setmode] = useState(true);

  //Functions
  async function getData() {
    const res = await axios.get(
      request.fetchNetflixOriginals + Math.floor(Math.random() * 1) + 1
    );
    setdata(
      res.data.results[Math.floor(Math.random() * res.data.results.length)]
    );
  }

  //Constants
  const image = {
    uri: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
  };

  //OnMount
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setmode(current);
  }, [current]);
  setTimeout(() => {
    setload(true);
  }, 1000);

  //Console Logs

  //Main Function
  if (Load && data.backdrop_path) {
    return (
      <>
        <StatusBar />
        <ScrollView style={{ backgroundColor: Dark ? "black" : "#F4F4F4" }}>
          <View style={Dark ? styles.Banner : Light.Banner}>
            <ImageBackground
              style={Dark ? styles.image : Light.image}
              source={image}
            >
              <LinearGradient
                colors={
                  Dark
                    ? [
                        "black",
                        "rgba(0,0,0,0.8)",
                        "rgba(0,0,0,0.6)",
                        "rgba(0,0,0,0.4)",
                        "rgba(0,0,0,0.2)",
                        "transparent",
                      ]
                    : ["white", "rgba(225,225,225,0.2)", "transparent"]
                }
                style={Dark ? styles.overlaytop : Light.overlaytop}
              />
              <View style={Dark ? styles.plus : Light.plus}>
                <Text style={Dark ? styles.plusTitle : Light.plusTitle}>
                  {data?.name ||
                    data?.title ||
                    data?.titlename ||
                    data?.original_name}
                </Text>
                <Pressable
                  style={Dark ? styles.play : Light.play}
                  onPress={() => {
                    navigation.navigate("CardDetail", {
                      data: data,
                    });
                  }}
                >
                  <AntDesign name="play" size={18} color={"black"} />
                  <Text style={Dark ? styles.playText : Light.playText}>
                    {" "}
                    PLAY{" "}
                  </Text>
                </Pressable>
                <Text
                  style={Dark ? styles.plusText : Light.plusText}
                  numberOfLines={5}
                  ellipsizeMode="tail"
                >
                  {data.overview}
                </Text>
              </View>
              <LinearGradient
                colors={
                  Dark
                    ? [
                        "transparent",
                        "rgba(0,0,0,0.2)",
                        "rgba(0,0,0,0.4)",
                        "rgba(0,0,0,0.6)",
                        "rgba(0,0,0,0.8)",
                        "black",
                      ]
                    : ["transparent", "rgba(225,225,225,0.2)", "white"]
                }
                style={Dark ? styles.overlay : Light.overlay}
              />
            </ImageBackground>
          </View>
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Action Movies"
            fetchUrl={request.fetchActionMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Horror Movies"
            fetchUrl={request.fetchHorrorMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Adventure Movies"
            fetchUrl={request.fetchAdventureMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Romantic Movies"
            fetchUrl={request.fetchRomanceMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Thriller Movies"
            fetchUrl={request.fetchTrillerMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Fantasy Movies"
            fetchUrl={request.fetchFantasyMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Comedy Movies"
            fetchUrl={request.fetchComedyMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Science Fiction Movies"
            fetchUrl={request.fetchScienceFiction}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Mystery Movies"
            fetchUrl={request.fetchMysteryMovie}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Animation Movies"
            fetchUrl={request.fetchAnimationMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Crime Movies"
            fetchUrl={request.fetchCrimeMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Drama Movies"
            fetchUrl={request.fetchDrameMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="War Movies"
            fetchUrl={request.fetchWarMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Western Movies"
            fetchUrl={request.fetchWesternMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="Family Movies"
            fetchUrl={request.fetchFamilyMovies}
            navigation={navigation}
          />
          <MovieCard
            thumb={false}
            mode={Dark}
            title="History Movies"
            fetchUrl={request.fetchHistory}
            navigation={navigation}
          />
        </ScrollView>
      </>
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
  Banner: {
    width: "100%",
    height: 320,
    marginBottom: 10,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  play: {
    flexDirection: "row",
    width: 85,
    height: 30,
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    left: 10,
    marginVertical: 7,
  },
  playText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  plus: {
    width: "70%",
    height: "auto",
    left: 20,
    top: "25%",
    zIndex: 100,
  },
  plusTitle: {
    marginTop: 20,
    color: "white",
    fontSize: 26,
    fontWeight: "700",
  },
  plusText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    lineHeight: 20,
  },
  overlay: {
    position: "absolute",
    height: 30,
    right: 0,
    bottom: -2,
    left: 0,
  },
  overlaytop: {
    position: "absolute",
    height: 30,
    right: 0,
    top: 0,
    left: 0,
  },
});

const Light = StyleSheet.create({
  header: {
    paddingTop: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  Banner: {
    width: "100%",
    height: 320,
    marginBottom: 10,
    backgroundColor: "white",
  },
  mode: {
    color: "black",
    marginVertical: 5,
    marginRight: 15,
  },
  play: {
    flexDirection: "row",
    width: 85,
    height: 30,
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    left: 10,
    marginVertical: 7,
  },
  playText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  plus: {
    width: "70%",
    height: "auto",
    left: 20,
    top: "25%",
    zIndex: 100,
  },
  plusTitle: {
    marginTop: 20,
    color: "white",
    fontSize: 26,
    fontWeight: "700",
  },
  plusText: {
    color: "white",
    marginTop: 5,
    fontSize: 16,
    lineHeight: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    height: 20,
    right: 0,
    bottom: -2,
    left: 0,
  },
  overlaytop: {
    position: "absolute",
    height: 30,
    right: 0,
    top: 0,
    left: 0,
  },
});