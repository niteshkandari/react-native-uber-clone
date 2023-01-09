import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "7893",
    icon: "home",
    location: "Home",
    destination: "Code Street, London Uk",
  },
  {
    id: "2313",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London Uk",
  },
];
const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => {
        return <View style={[tw`bg-gray-200`, { height: 0.5 }]} />;
      }}
      renderItem={({ item: { location, destination, icon } }) => {
        return (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
              type={"ionicon"}
              color={"white"}
              name={icon}
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavFavourites;
