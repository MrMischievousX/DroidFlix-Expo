import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Card from "../Components/Card";
import request from "../Components/request.js";

export default function Homescreen() {
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
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
      <Card thumb={false} title="Top Rated" fetchUrl={request.fetchTopRated} />
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
  );
}

const styles = StyleSheet.create({});
