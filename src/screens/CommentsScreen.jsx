import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import Comment from "../components/Comment";
import UpArrowIcon from "../../assets/icons/UpArrowIcon";
import { useSelector } from "react-redux";
import { addCommentToPost } from "../utils/firestore";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CommentsScreen = ({ route }) => {
  const user = useSelector((state) => state.user.userInfo);
  const post = route?.params?.post;
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const addComment = async () => {
    if (newComment.trim()) {
      const newCommentObj = {
        uid: Date.now(),
        userUid: user.uid,
        userImage: user.profilePhoto,
        text: newComment,
        timestamp: new Date().toLocaleString("uk-UA", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      await addCommentToPost(post.uid, user.uid, newCommentObj);
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <FlatList
          data={comments}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <Comment item={item} ownComment={item.userUid == user.uid} />
          )}
          contentContainerStyle={styles.list}
        />
      </>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.button} onPress={addComment}>
            <UpArrowIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 0,
  },
  image: {
    marginHorizontal: 16,
    width: SCREEN_WIDTH - 32,
    height: 240,
    borderRadius: 8,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    // paddingVertical: 16,
    gap: 24,
    paddingVertical: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    position: "relative",
    paddingTop: 16,
  },
  input: {
    flex: 1,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 16,

    paddingRight: 58,
    height: 50,
  },
  button: {
    backgroundColor: "#ff7f50",
    borderRadius: 20,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 24,
    right: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CommentsScreen;
