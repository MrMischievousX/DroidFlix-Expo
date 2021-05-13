import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import Card from "../Components/Card";
import axios from "../Components/axios";
import request from "../Components/request";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

export default function Homescreen() {
  const [data, setdata] = useState([]);
  const [Load, setload] = useState(false);

  async function getData() {
    const res = await axios.get(
      request.fetchNetflixOriginals + Math.floor(Math.random() * 5) + 1
    );
    setdata(
      res.data.results[Math.floor(Math.random() * res.data.results.length)]
    );
  }

  let image = {
    uri: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
  };

  if (Load && data.backdrop_path) {
    return (
      <>
        <StatusBar />
        <ScrollView style={{ backgroundColor: "black" }}>
          <View style={styles.Banner}>
            <ImageBackground style={styles.image} source={image}>
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(0,0,0,0.2)",
                  "rgba(0,0,0,0.4)",
                  "rgba(0,0,0,0.6)",
                  "rgba(0,0,0,0.8)",
                  "black",
                ]}
                style={styles.overlay}
              />
            </ImageBackground>
          </View>
          <Card
            thumb={true}
            title="Droidflix Originals"
            fetchUrl={request.fetchNetflixOriginals}
          />
          <Card
            thumb={false}
            title="Top Trending"
            fetchUrl={request.fetchTrending}
          />
          <Card
            thumb={false}
            title="Top Rated"
            fetchUrl={request.fetchTopRated}
          />
          <Card
            thumb={false}
            title="Action Movies"
            fetchUrl={request.fetchActionMovies}
          />
          <Card
            thumb={false}
            title="Adventure Movies"
            fetchUrl={request.fetchAdventureMovies}
          />
          <Card
            thumb={false}
            title="Horror Movies"
            fetchUrl={request.fetchHorrorMovies}
          />
          <Card
            thumb={false}
            title="Romantic Movies"
            fetchUrl={request.fetchRomanceMovies}
          />
          <Card
            thumb={false}
            title="Thriller Movies"
            fetchUrl={request.fetchTrillerMovies}
          />
          <Card
            id="Fantasy"
            thumb={false}
            title="Fantasy Movies"
            fetchUrl={request.fetchFantasyMovies}
          />
          <Card
            thumb={false}
            title="Comedy Movies"
            fetchUrl={request.fetchComedyMovies}
          />
          <Card
            thumb={false}
            title="Science Fiction Movies"
            fetchUrl={request.fetchScienceFiction}
          />
          <Card
            thumb={false}
            title="Mystery Movies"
            fetchUrl={request.fetchMysteryMovie}
          />
          <Card
            thumb={false}
            title="Animation Movies"
            fetchUrl={request.fetchAnimationMovies}
          />
          <Card
            thumb={false}
            title="Crime Movies"
            fetchUrl={request.fetchCrimeMovies}
          />
          <Card
            thumb={false}
            title="Drama Movies"
            fetchUrl={request.fetchDrameMovies}
          />
          <Card
            thumb={false}
            title="War Movies"
            fetchUrl={request.fetchWarMovies}
          />
          <Card
            thumb={false}
            title="Western Movies"
            fetchUrl={request.fetchWesternMovies}
          />
          <Card
            thumb={false}
            title="Family Movies"
            fetchUrl={request.fetchFamilyMovies}
          />
          <Card
            thumb={false}
            title="History Movies"
            fetchUrl={request.fetchHistory}
          />
          <Card
            thumb={false}
            title="Documentaries"
            fetchUrl={request.fetchDocumentaries}
          />
        </ScrollView>
      </>
    );
  } else {
    return (
      <AppLoading
        startAsync={getData}
        onFinish={() => setload(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  Banner: {
    width: "100%",
    height: 320,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    height: 30,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
