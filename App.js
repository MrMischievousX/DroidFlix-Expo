//Imports
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "./Src/Screens/Movie";
import Search from "./Src/Screens/Search";
import Settings from "./Src/Screens/Settings";
import TvShows from "./Src/Screens/TvShows";
import Homescreen from "./Src/Screens/Homescreen";
import CardDetail from "./Src/Components/CardDetail";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import Mainscreen from "./Mainscreen"

//Homestack
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Homescreen} />
      <HomeStack.Screen name="CardDetail" component={CardDetail} />
    </HomeStack.Navigator>
  );
}

//Searchstack
const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
}

//Moviestack
const MovieStack = createStackNavigator();
function MovieStackScreen() {
  return (
    <MovieStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MovieStack.Screen name="Movie" component={Movie} />
    </MovieStack.Navigator>
  );
}

//Tvstack
const TvStack = createStackNavigator();
function TvShowStackScreen() {
  return (
    <TvStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TvStack.Screen name="TvShows" component={TvShows} />
    </TvStack.Navigator>
  );
}

//Tabnavigator
const Tab = createBottomTabNavigator();
export default function App() {
  const [Load, setLoad] = React.useState(false)

  if (Load) {
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
              backgroundColor: 'black',
              paddingTop: 12,
            }
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Movies" component={MovieStackScreen} />
          <Tab.Screen name="Tv Shows" component={TvShowStackScreen} />
          <Tab.Screen name="Search" component={SearchStackScreen} />
          <Tab.Screen name="Settings" children={() => <Settings click={setLoad} />} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}
