import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-123",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const getUberPricing = (multiplier) => {
    const SURGE_CHARGE_RATE = 1.5;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(
      (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) /10
    );
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw` rounded-full absolute top-2 left-5`}
        >
          <Icon name={"chevron-left"} type={"fontawesome"} />
        </TouchableOpacity>
        <Text style={tw`text-center font-semibold py-1 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        style={tw``}
        renderItem={({ item: { title, image, id, multiplier }, item }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row items-center justify-between px-10 ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{ uri: image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>
                  {travelTimeInformation?.duration.text} travel time...
                </Text>
              </View>
              <Text style={tw`text-xl font-bold`}>
                {getUberPricing(multiplier)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={tw`-mt-2`}>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
