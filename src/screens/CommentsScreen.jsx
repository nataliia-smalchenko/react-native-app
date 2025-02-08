import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
} from "react-native";
import Comment from "../components/Comment";
import UpArrowIcon from "../assets/icons/UpArrowIcon";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CommentsScreen = () => {
  const [comments, setComments] = useState([
    {
      id: "1",
      username: "User1",
      userImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
      text: "Really love your most recent photo. I've been trying to capture the same thing for a few months and would love some tips!",
      timestamp: "09 червня, 2020 | 08:40",
    },
    {
      id: "2",
      username: "CurrentUser",
      userImage:
        "https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_1280.jpg",
      text: "A fast 50mm like f1.8 would help with the bokeh. I've been using primes as they tend to get a bit sharper images.",
      timestamp: "09 червня, 2020 | 09:14",
    },
    {
      id: "3",
      username: "User1",
      userImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
      text: "Thank you! That was very helpful!",
      timestamp: "09 червня, 2020 | 09:20",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: (comments.length + 1).toString(),
        username: "CurrentUser",
        userImage:
          "https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_1280.jpg",
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
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Image
          // source={{ uri: "https://example.com/sunset.jpg" }}
          source={require("../assets/images/PhotoBG.png")}
          style={styles.image}
        />
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Comment item={item} ownComment={item.username == "CurrentUser"} />
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
    paddingVertical: 32,
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
    paddingVertical: 16,
    gap: 24,
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
