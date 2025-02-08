import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileImage from "../components/ProfileImage";
import Post from "../components/Post";
import { FlatList } from "react-native-gesture-handler";
import LogoutIcon from "../assets/icons/LogoutIcon";

const posts = [
  {
    id: "1",
    image: "https://example.com/forest.jpg",
    caption: "Ліс",
    comments: 0,
    likes: 0,
    location: "Ukraine",
  },
  {
    id: "2",
    image: "https://example.com/sunset.jpg",
    caption: "Захід на Чорному морі",
    comments: 3,
    likes: 3,
    location: "Ukraine",
  },
  {
    id: "3",
    image: "https://example.com/sunset.jpg",
    caption: "Старий будиночок у Венеції",
    comments: 3,
    likes: 3,
    location: "Italy",
  },
];
const ProfileScreen = ({ navigation }) => {
  const renderHeader = () => (
    <View style={{ position: "relative" }}>
      <ProfileImage style={{ transform: "translateX(-60%)" }} />
      <Text style={styles.header}>Natali Romanova</Text>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          navigation.replace("Login");
        }}
      >
        <LogoutIcon />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/PhotoBG.png")}
        resizeMode="cover"
      >
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post
              post={item}
              onCommentsPress={() => {
                navigation.navigate("CommentsScreen");
              }}
              style={{ marginLeft: 16, marginRight: 16 }}
              isProfile={true}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: Platform.OS === "ios" ? 0 : 172 },
          ]}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  header: {
    color: "#212121",
    fontSize: 30,
    width: "100%",
    marginTop: 92,
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  list: {
    marginTop: 156,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingBottom: 32,
  },
});

export default ProfileScreen;
