import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ThumbUpIcon from "../assets/icons/ThumbUpIcon";
import MessageIcon from "../assets/icons/MessageIcon";
import MapPinIcon from "../assets/icons/MapPinIcon";

const Post = ({ post, isProfile, onCommentsPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.image}
        // source={{ uri: post.image }}
        source={require("../assets/images/PhotoBG.png")}
      />
      <Text style={styles.caption}>{post.caption}</Text>
      <View style={styles.postFooter}>
        <View style={styles.commentsLikes}>
          <TouchableOpacity style={styles.likes} onPress={onCommentsPress}>
            <MessageIcon
              fill={post.comments ? "#FF6C00" : "none"}
              stroke={post.comments ? "#FF6C00" : "#BDBDBD"}
            />
            <Text style={styles.commentsIcon}>{post.comments}</Text>
          </TouchableOpacity>
          {isProfile && (
            <View style={styles.likes}>
              <ThumbUpIcon />
              <Text style={styles.commentsIcon}>{post.likes}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.likes}>
          <MapPinIcon />
          <Text style={styles.locationText}>
            {post.location.length > 35
              ? post.location.slice(0, 32) + "..."
              : post.location}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  caption: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "medium",
    marginTop: 8,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  commentsLikes: {
    flexDirection: "row",
    gap: 24,
  },
  likes: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  commentsIcon: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#BDBDBD",
  },
  locationText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default Post;
