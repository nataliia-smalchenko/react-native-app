import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import LeftArrowIcon from "../../assets/icons/LeftArrowIcon";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <Stack.Navigator
      initialRouteName={user ? "Home" : "Login"}
      screenOptions={{
        headerShown: false,
        animation: "fade",
        presentation: "transparentModal",
      }}
    >
      {user ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
