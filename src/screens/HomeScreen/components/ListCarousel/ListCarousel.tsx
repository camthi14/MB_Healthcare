import { BLUR_HASH } from "@/constants/common";
import { Image } from "expo-image";
import React, { FC, useMemo } from "react";
import { View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import useStyles from "./ListCarouselStyle";

const ListCarousel: FC = () => {
  const styles = useStyles();

  const images = useMemo(
    () => [
      require("@/assets/banner/1.png"),
      require("@/assets/banner/2.png"),
      require("@/assets/banner/3.png"),
      require("@/assets/banner/4.png"),
    ],
    []
  );

  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={0}
      // showPagination
      data={images}
      renderItem={({ item }) => (
        <View style={styles.child}>
          <Image
            source={item}
            style={styles.imgBackground}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={1000}
          />
        </View>
      )}
    />
  );
};

export default ListCarousel;
