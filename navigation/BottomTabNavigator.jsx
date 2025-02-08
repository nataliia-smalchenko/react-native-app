import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import PostsScreen from "../screens/PostsScreen";
import LogoutIcon from "../assets/icons/LogoutIcon";
import GridIcon from "../assets/icons/GridIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import UserIcon from "../assets/icons/UserIcon";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerRightContainerStyle: {
          paddingRight: 16,
          paddingVertical: 11,
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
          paddingVertical: 11,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: "15%",
          paddingTop: 12,
          height: 80,
        },
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.replace("Login");
              }}
            >
              <LogoutIcon />
            </TouchableOpacity>
          ),
          tabBarIcon: () => <GridIcon />,
        })}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          animation: "fade",
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.replace("CreatePost");
              }}
              style={styles.plusButton}
            >
              <PlusIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <UserIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabNavigator;
