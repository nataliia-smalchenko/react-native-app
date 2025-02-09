import React, { useEffect, useState, useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { getAllPosts } from "../utils/firestore";
import { useFocusEffect } from "@react-navigation/native";

const PostsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
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
    <View style={styles.userInfo}>
      <Image
        style={styles.userImage}
        source={{ uri: user?.profilePhoto }}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.userName}>{user?.displayName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        ,
        {
          flex: posts.length ? 0 : 1,
        },
      ]}
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            onCommentsPress={() => {
              navigation.navigate("CommentsScreen", { post: item });
            }}
            onLocationPress={() => {
              navigation.navigate("MapScreen", { coords: item.location });
            }}
          />
        )}
        keyExtractor={(item) => item.uid}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.list,
          {
            flex: posts.length ? 0 : 1,
          },
        ]}
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
    backgroundColor: "#fff",
  },
});

export default PostsScreen;
