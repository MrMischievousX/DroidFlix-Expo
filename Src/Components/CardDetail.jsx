//Imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "../Components/axios";
import * as Font from "expo-font";
import Cast from "./Cast";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const url1 = "https://image.tmdb.org/t/p/original";
const url2 = "https://image.tmdb.org/t/p/w500";

const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};

export default function CardDetail({ route }) {
  //States
  const [genre, setgenre] = useState([
    {
      name: "Action",
    },
    {
      name: "Adventure",
    },
  ]);
  const [Load, setload] = useState(false);
  const [rate, setrate] = useState(8);
  const [runtime, setruntime] = useState(120);
  const [year, setyear] = useState(2012);

  //Constants
  const { data } = route.params;
  const Language = data.original_language;
  const id = data.id;
  const image = {
    uri: `${url1}${data.backdrop_path || data.poster_path}`,
  };
  const PosterImage = {
    uri: `${url2}${data.poster_path}`,
  };

  //Functions
  const GetAll = async () => {
    try {
      await axios
        .get(`/movie/${id}?api_key=e057c1c54b5e1bad35cdc1d8d3152acf`)
        .then((movie1) => {
          if (movie1.data.genres.length > 1) {
            setgenre(movie1.data.genres);
            setruntime(movie1.data.runtime);
          }
          setrate(data.vote_average);
          setyear(
            data.first_air_date
              ? data.first_air_date.slice(0, 4)
              : data.release_date.slice(0, 4)
          );
          setTimeout(() => {
            setload(true);
          }, 500);
        });
    } catch (err) {
      setload(true);
      // console.warn(err);
    }

    // console.log(
    //   await axios.get(
    //     `/movie/${id}/images?api_key=e057c1c54b5e1bad35cdc1d8d3152acf`
    //   )
    // );
  };

  //On Mount
  useEffect(() => {
    fetchFonts();
    GetAll();
    console.log(data.poster_path);
  }, []);

  //Consoles

  //Main Function
  if (Load) {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.viewStyle}>
          <View style={styles.contain}>
            <ImageBackground
              source={image}
              style={styles.image}
            ></ImageBackground>
          </View>
          <View style={styles.posterContain}>
            <Image
              source={PosterImage}
              style={{
                flex: 1,
                resizeMode: "cover",
              }}
            />
          </View>
          <AntDesign
            name="play"
            size={40}
            color="red"
            style={styles.playButton}
            onPress={() => console.log("pressed")}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.movieTitle}>
              {data?.name ||
                data?.title ||
                data?.titlename ||
                data?.original_name}
            </Text>
            <Text style={styles.genreTitle}>
              {genre[0].name}, {genre[1].name}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <FontAwesome
                style={{ marginRight: 5 }}
                name={
                  rate > 1 ? "star" : rate === 0 ? "star-o" : "star-half-full"
                }
                size={28}
                color="red"
              />
              <FontAwesome
                style={{ marginRight: 5 }}
                name={
                  rate > 3
                    ? "star"
                    : rate <= 2 && rate < 3
                    ? "star-o"
                    : "star-half-full"
                }
                size={28}
                color="red"
              />
              <FontAwesome
                style={{ marginRight: 5 }}
                name={
                  rate > 5
                    ? "star"
                    : rate <= 4 && rate < 5
                    ? "star-o"
                    : "star-half-full"
                }
                size={28}
                color="red"
              />
              <FontAwesome
                style={{ marginRight: 5 }}
                name={
                  rate > 7
                    ? "star"
                    : rate <= 6 && rate < 7
                    ? "star-o"
                    : "star-half-full"
                }
                size={28}
                color="red"
              />
              <FontAwesome
                style={{ marginRight: 5 }}
                name={
                  rate > 9
                    ? "star"
                    : rate <= 8 && rate < 9
                    ? "star-o"
                    : "star-half-full"
                }
                size={28}
                color="red"
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={styles.yearStyle}>
                <Text style={styles.yearTextTitleStyle}>Year</Text>
                <Text style={styles.yearTextStyle}>{year}</Text>
              </View>
              <View style={styles.yearStyle}>
                <Text style={styles.yearTextTitleStyle}>Language</Text>
                <Text
                  style={{
                    ...styles.yearTextStyle,
                    textTransform: "uppercase",
                  }}
                >
                  {Language}
                </Text>
              </View>
              <View style={styles.yearStyle}>
                <Text style={styles.yearTextTitleStyle}>Length</Text>
                <Text style={styles.yearTextStyle}>{runtime} min</Text>
              </View>
            </View>
            <Text style={styles.overview}>{data.overview}</Text>
          </View>

          <Cast id={id} defaultSrc={data.poster_path} />
        </View>
      </ScrollView>
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
  playButton: {
    elevation: 31,
    bottom: -15,
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    textAlignVertical: "center",
    textAlign: "center",
    zIndex: 1,
  },
  yearStyle: {
    width: 80,
    height: 40,
    marginHorizontal: 10,
  },
  overview: {
    color: "grey",
    lineHeight: 20,
    marginTop: 15,
    textAlign: "center",
    marginHorizontal: 35,
    fontSize: 16,
  },
  yearTextStyle: {
    color: "#221F22",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  yearTextTitleStyle: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  viewStyle: {
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: windowWidth,
    height: windowHeight / 2,
    resizeMode: "cover",
  },
  contain: {
    width: 700,
    height: 350,
    alignItems: "center",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    overflow: "hidden",
    elevation: 29,
  },
  posterContain: {
    overflow: "hidden",
    position: "absolute",
    width: 120,
    height: 170,
    top: 220,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    elevation: 30,
  },
  detailContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  movieTitle: {
    color: "#201D20",
    fontSize: 28,
    textAlign: "center",
    letterSpacing: 1,
    marginHorizontal: 50,
    color: "#221F22",
    fontFamily: "Bebas",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  genreTitle: {
    letterSpacing: 1,
    fontSize: 18,
    marginHorizontal: 50,
    marginTop: 5,
    color: "#221F22",
    fontFamily: "Bebas",
    textAlign: "center",
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
