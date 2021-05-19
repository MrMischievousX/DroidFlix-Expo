import React from "react";
import { View, Text } from "react-native";

export default function HomeBanner() {
  return (
    <View>
      <Text>Banner</Text>
    </View>
  );
}

// shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
    
// Keystore credentials
//   Keystore password: 7eef01c7526a476c901d53958178557c
//   Key alias:         QG1ybWlzY2hpZXZvdXN4L0Ryb2lkRmxpeA==
//   Key password:      e6dd0b7953854ac7a4580ea2e1e9773d

//   Path to Keystore:  D:\torrent\Tutorials\[FreeCourseSite.com] Udemy - The Complete React Native + Hooks Course [2020 Edition]\1. Getting Started\Projects\Netflix Clone\DroidFlix\DroidFlix.jks

// java -jar "D:\torrent\Tutorials\[FreeCourseSite.com] Udemy - The Complete React Native + Hooks Course [2020 Edition]\1. Getting Started\Projects\Netflix Clone\bundletool-all-1.6.0.jar" build-apks --bundle="D:\torrent\Tutorials\[FreeCourseSite.com] Udemy - The Complete React Native + Hooks Course [2020 Edition]\1. Getting Started\Projects\Netflix Clone\droid.aab" --output="D:\torrent\Tutorials\[FreeCourseSite.com] Udemy - The Complete React Native + Hooks Course [2020 Edition]\1. Getting Started\Projects\Netflix Clone\build.apks" --ks="D:\torrent\Tutorials\[FreeCourseSite.com] Udemy - The Complete React Native + Hooks Course [2020 Edition]\1. Getting Started\Projects\Netflix Clone\DroidFlix.jks" --ks-key-alias=QG1ybWlzY2hpZXZvdXN4L0Ryb2lkRmxpeA==

//Imports
import React, { useEffect, useState } from "react";
import {
  Linking,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import * as Font from "expo-font";
import axiosX from "axios";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Functions
const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};

export default function CardDetail({ route, navigation }) {
  //States
  const [Load, setload] = useState(false);
  const [suggestions, setsuggestions] = useState([]);

  //Constants
  const { data, current } = route.params;
  const id = data.id;
  const Language = data.language;
  const title = data.title_english;
  const magnetTitle = title.split(" ").join("%20");
  const year = data.year;
  const rate = data.rating;
  const runtime = data.runtime;
  const poster = data.large_cover_image;
  const genre = data.genres;
  const overview = data.description_full;
  const torrent = data.torrents[0].url;
  const magnet = `magnet:?xt=urn:btih:${data.torrents[0].hash}&dn=${magnetTitle}&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969`;

  //Functions
  const search = async () => {
    await axiosX
      .get(`https://yts.proxybit.monster/api/v2/movie_suggestions.json?movie_id=${id}`)
      .then((data) => {
        setsuggestions(data.data.data.movies);
      });
  };
  setTimeout(() => {
    setload(true);
  }, 1000);

  //On Mount
  useEffect(() => {
    search();
    fetchFonts();
    return () => {};
  }, []);

  //Consoles

  //Functions
  const List = ({ data, navigation }) => {
    return (
      <>
        <Text> Hello </Text>
        <FlatList
          style={{ backgroundColor: current ? "black" : "white" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => {
            const image = {
              uri: item.large_cover_image || item.medium_cover_image,
            };
            if (!(item.large_cover_image || item.medium_cover_image))
              return null;
            else
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("DownloadDetail", {
                      data: item,
                      mode: Dark,
                    });
                  }}
                  style={styles.viewStyle}
                >
                  <Image source={image} style={styles.imageStyle} />
                </Pressable>
              );
          }}
        />
      </>
    );
  };

  //Styles
  const styles = StyleSheet.create({
    viewStyle: {
      overflow: "hidden",
      height: windowHeight / 4,
      width: windowWidth / 3,
      marginHorizontal: 10,
      marginVertical: 20,
    },
    imageStyle: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: current ? "white" : "black",
      flex: 1,
      resizeMode: "cover",
    },
    image: {
      borderRadius: 10,
      borderWidth: 2,
      width: windowWidth / 2.2,
      height: windowHeight / 2.8,
      resizeMode: "cover",
    },
    title: {
      textAlign: "center",
      marginHorizontal: 3,
      fontSize: 30,
    },
  });

  //Main Function
  if (Load) {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10, marginVertical: 20 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={{ uri: poster }} style={styles.image} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text>{Language}</Text>
          <Text>{year}</Text>
          <Text>{rate}</Text>
          <Text>{runtime}</Text>
          <Text>{genre}</Text>

          <Text onPress={() => Linking.openURL(magnet)}>{torrent}</Text>
          <Text>{overview}</Text>
          <List data={suggestions} navigation={navigation} />
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

