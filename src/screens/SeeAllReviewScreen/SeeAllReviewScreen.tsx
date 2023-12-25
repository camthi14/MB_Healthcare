import Container from "@/components/shared/Container";
import { useGlobalStyles } from "@/components/shared/GlobalStyles";
import ReviewItem from "@/components/shared/ReviewItem/ReviewItem";
import AppbarOverride from "@/components/ui/AppbarOverride";
import reviews from "@/mock/review";
import { RootStackParamList } from "@/types/navigation";
import { MARGIN_BOTTOM_NAV, SPACING } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC } from "react";
import { FlatList, View } from "react-native";

const SeeAllReviewScreen: FC = () => {
  const {
    params: { doctorName },
  } = useRoute<RouteProp<RootStackParamList, "SeeAllReview">>();
  const globalStyles = useGlobalStyles();

  return (
    <Container>
      <AppbarOverride isGoBack title={`Đánh giá của ${doctorName}`} />

      <View style={[globalStyles.flex, { paddingHorizontal: SPACING }]}>
        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={reviews}
            renderItem={({ item }) => <ReviewItem {...item} />}
            ListFooterComponent={<View style={{ marginBottom: MARGIN_BOTTOM_NAV }} />}
          />
        </View>
      </View>
    </Container>
  );
};

export default SeeAllReviewScreen;
