import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import LeftArrowIcon from "../assets/icons/LeftArrowIcon";
import { TouchableOpacity } from "react-native";
import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerLeftContainerStyle: {
            paddingHorizontal: 16,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 16,
          },
          animation: "fade",
          headerShown: true,
          title: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity>
              <LeftArrowIcon
                onPress={() => {
                  navigation.replace("Home");
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Коментарі",
          presentation: "transparentModal",
          headerShown: true,
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeft: () => (
            <TouchableOpacity>
              <LeftArrowIcon
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
