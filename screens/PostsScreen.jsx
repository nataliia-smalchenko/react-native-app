import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Post from "../components/Post";
import { FlatList } from "react-native-gesture-handler";

const user = {
  name: "Natali Romanova",
  email: "email@example.com",
  imagePath: "../assets/images/PhotoBG.png",
};
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
];

const PostsScreen = ({ navigation }) => {
  const renderHeader = () => (
    <View style={styles.userInfo}>
      <Image
        style={styles.userImage}
        source={require("../assets/images/PhotoBG.png")}
        // source={{ uri: user.imagePath }}
        // source={{ uri: imageUri }}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            onCommentsPress={() => {
              navigation.navigate("CommentsScreen");
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
  },
  userName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    alignItems: "center",
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 13,
    alignItems: "center",
    color: "#212121cc",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export default PostsScreen;
