import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
// import { GOOGLE_MAPS_API_KEY } from "@env";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <View style={tw`p-5`}>
        <Image
          style={[
            tw``,
            {
              width: 100,
              height: 100,
              resizeMode: "contain",
            },
          ]}
          source={{
            url: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Where from ?"
          onPress={(data, details = null) => {
            dispatch(setOrigin({
                location:details.geometry.location,
                description:data.description
              }))
              dispatch(setDestination(null));
              // 'details' is provided when fetchDetails = true
            }}
            styles={{
              container:{
                flex:0
              },
              textInput:{
                fontSize:18 
              }
            }}
          fetchDetails={true}
          minLength={2}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          nearbyPlacesAPI={"GooglePlacesSearch"}
          debounce={400}
          query={{
            key: process.env.GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
        />
        <NavOptions />
        <NavFavourites/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
