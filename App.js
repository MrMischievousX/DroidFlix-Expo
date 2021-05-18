//Imports
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "./Src/Screens/MovieScreen/Movie";
import Search from "./Src/Screens/SearchScreen/Search";
import Settings from "./Src/Screens/SettingScreen/Settings";
import TvShows from "./Src/Screens/TvScreen/TvShows";
import Homescreen from "./Src/Screens/HomeScreen/Homescreen";
import CardDetail from "./Src/Components/CardDetail";
import DownloadDetail from "./Src/Components/DownloadDetail";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import Mainscreen from "./Mainscreen"

//Homestack
const HomeStack = createStackNavigator();
function HomeStackScreen({ current, navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" children={() => <Homescreen navigation={navigation} current={current} />} />
      <HomeStack.Screen name="CardDetail" children={({ route, navigation }) =>
        <CardDetail route={route} navigation={navigation} />
      } />
    </HomeStack.Navigator>
  );
}

//Moviestack
const MovieStack = createStackNavigator();
function MovieStackScreen({ current, navigation }) {
  return (
    <MovieStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MovieStack.Screen name="Movie" children={() => <Movie current={current} navigation={navigation} />} />
      <MovieStack.Screen name="CardDetail" children={({ route, navigation }) => < CardDetail route={route} navigation={navigation} />} />
    </MovieStack.Navigator>
  );
}

//Tvstack
const TvStack = createStackNavigator();
function TvShowStackScreen({ current, navigation }) {
  return (
    <TvStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TvStack.Screen name="TvShows" children={() => <TvShows current={current} navigation={navigation} />} />
      <TvStack.Screen name="CardDetail" children={({ route, navigation }) => <CardDetail route={route} navigation={navigation} />} />
    </TvStack.Navigator>
  );
}

//Searchstack
const SearchStack = createStackNavigator();
function SearchStackScreen({ current, navigation }) {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name="Search" children={() => <Search current={current} navigation={navigation} />} />
      <SearchStack.Screen name="DownloadDetail" children={({ route, navigation }) => <DownloadDetail navigation={navigation} route={route} />} />
    </SearchStack.Navigator>
  );
}



//Tabnavigator
const Tab = createBottomTabNavigator();
export default function App() {
  const [Load, setLoad] = React.useState(false)
  const [dark, setdark] = React.useState(true)
  if (!Load) {
    return (
      <>
        <Mainscreen click={setLoad} />
      </>
    );
  }
  else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
                return <Ionicons name={iconName} size={24} color={color} />;
              } else if (route.name === "Movies") {
                iconName = focused ? "movie-open" : "movie-open-outline";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={color}
                  />
                );
              } else if (route.name === "Tv Shows") {
                iconName = focused ? "tv" : "tv-outline";
                return <Ionicons name={iconName} size={24} color={color} />;
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "search";
                return <Ionicons name={iconName} size={24} color={color} />;
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-settings" : "ios-settings-outline";
                return <Ionicons name={iconName} size={24} color={color} />;
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "red",
            inactiveTintColor: "gray",
            pressColor: 'gray',
            labelStyle: {
              fontSize: 11,
              marginTop: 8,
            },
            style: {
              bottom: 0,
              borderTopWidth: 0.1,
              backgroundColor: dark ? "black" : 'white',
              paddingTop: 12,
            }
          }}
        >
          <Tab.Screen name="Home"
            children={({ navigation }) => <HomeStackScreen current={dark} navigation={navigation} />} />
          <Tab.Screen name="Movies"
            children={({ navigation }) => <MovieStackScreen current={dark} navigation={navigation} />} />
          <Tab.Screen name="Tv Shows"
            children={({ navigation }) => <TvShowStackScreen current={dark} navigation={navigation} />} />
          <Tab.Screen name="Search"
            children={({ navigation }) => <SearchStackScreen current={dark} navigation={navigation} />} />
          <Tab.Screen name="Settings"
            children={(navigation) => <Settings click={setLoad} dark={setdark} navigation={navigation} current={dark} />} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}
