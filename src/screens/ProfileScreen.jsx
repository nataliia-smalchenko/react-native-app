import React, { useEffect, useState, useCallback } from "react";
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
import LogoutIcon from "../../assets/icons/LogoutIcon";
import { useDispatch, useSelector } from "react-redux";
import { logoutDB } from "../utils/auth";
import { useFocusEffect } from "@react-navigation/native";
import { getAllPosts } from "../utils/firestore";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    if (user?.uid) {
      const userPosts = await getAllPosts(user.uid);
      setPosts(userPosts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?.uid]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const renderHeader = () => (
    <View style={{ position: "relative" }}>
      <ProfileImage
        style={{ transform: "translateX(-60%)" }}
        profilePhoto={user.profilePhoto}
      />
      <Text style={styles.header}>{user.displayName}</Text>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          // navigation.replace("Login");
          logoutDB(dispatch);
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
        source={require("../../assets/images/PhotoBG.png")}
        resizeMode="cover"
      >
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post
              post={item}
              onCommentsPress={() => {
                navigation.navigate("CommentsScreen", { post: item });
              }}
              style={{ marginLeft: 16, marginRight: 16 }}
              isProfile={true}
              onLocationPress={() => {
                navigation.navigate("MapScreen", { coords: item.coords });
              }}
            />
          )}
          keyExtractor={(item) => item.uid}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[
            styles.list,
            {
              paddingBottom: Platform.OS === "ios" ? 0 : 172,
              flex: posts.length ? 0 : 1,
            },
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
