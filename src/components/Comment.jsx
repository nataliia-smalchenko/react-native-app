import { Image, StyleSheet, Text, View } from "react-native";

const Comment = ({ item, ownComment }) => {
  return (
    <View
      style={[
        styles.comment,
        {
          flexDirection: ownComment ? "row-reverse" : "row",
        },
      ]}
    >
      <Image style={styles.userImage} source={{ uri: item.userImage }} />
      <View
        style={[
          styles.commentText,
          {
            borderBottomRightRadius: 6,
            borderBottomLeftRadius: 6,
            borderTopLeftRadius: ownComment ? 6 : 0,
            borderTopRightRadius: ownComment ? 0 : 6,
          },
        ]}
      >
        <Text style={styles.text}>{item.text}</Text>
        <Text
          style={[
            styles.timestamp,
            { alignSelf: ownComment ? "flex-end" : "flex-start" },
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    width: "100%",
    gap: 16,
    // border-radius: 0px 6px 6px 6px;
  },
  userImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentText: {
    flex: 1,
    backgroundColor: "#00000008",
    padding: 16,
    gap: 8,
  },
  text: {
    marginTop: 5,
    color: "#212121",
    fontSize: 13,
  },
  timestamp: {
    marginTop: 5,
    fontSize: 10,
    color: "#BDBDBD",
  },
});

export default Comment;
