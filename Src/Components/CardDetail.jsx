import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CardDetail({ route }) {
  const { data } = route.params;
  const url = "https://image.tmdb.org/t/p/original";
  let check;
  data.adult ? (check = "Yes") : (check = "No");
  console.log(data);
  const image = {
    uri: `${url}${data.poster_path}`,
  };
  console.log(image);
  return (
    <View style={styles.viewStyle}>
      <Image style={styles.tinyLogo} source={image} />
      <View>
        <View>
          <Text>
            {data?.title ||
              data?.original_name ||
              data?.titlename ||
              data?.name}
          </Text>
          <Text>{data.overview}</Text>
          <Text>Release Date :{data.release_date || data.first_air_date}</Text>
          <Text>Original Language :{data.language}</Text>
          <Text>Adult : {check}</Text>
          <Text>Average Vote :{data.vote_average}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 0.001,
    borderColor: "white",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  tinyLogo: {
    flex: 1,
  },
});
