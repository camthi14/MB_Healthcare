import { BLUR_HASH } from "@/constants/common";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { FC } from "react";
import { View } from "react-native";
import useStyles from "./ReviewItemStyles";
import { Text } from "react-native-paper";
import { fDate, fDateTime, fToNow } from "@/utils/formatTime";

export type ReviewItemProps = {
  id?: string;
  image: any;
  display_name: string;
  star: number;
  reviewContent: string;
  createdAt: string | Date;
};

const ReviewItem: FC<ReviewItemProps> = ({
  createdAt,
  display_name,
  image,
  reviewContent,
  star,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewHeaderInfo}>
          <View>
            <Image
              source={image}
              style={styles.avatar}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <View style={styles.wrapperInfo}>
            <Text style={styles.displayName}>{display_name}</Text>
            <Text style={styles.createdAt}>{fToNow(createdAt)}</Text>
          </View>
        </View>
        <View style={styles.reviewHeaderStar}>
          <View style={styles.wrapperStar}>
            <AntDesign name="star" size={styles.start.fontSize} color={styles.start.color} />
            <Text variant="labelLarge" style={styles.textStart}>
              {star}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.reviewContent}>
        <Text variant="bodySmall" style={styles.reviewContentText}>
          {reviewContent}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;
