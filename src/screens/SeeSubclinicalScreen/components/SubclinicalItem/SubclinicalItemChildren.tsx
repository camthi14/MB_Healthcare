import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { formatDate } from "@/helpers/date.helper";
import {
  ExaminationCardsDetailStatus,
  convertExaminationCardDetailStatus,
  convertExaminationCardDetailStatusColor,
} from "@/models/examinationCardDetails.model";
import { ResultsDiagnosisSubclinical } from "@/models/resultsDiagnosisSubclinical.model";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";
import { scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { Image } from "expo-image";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { Text } from "react-native-paper";

type SubclinicalItemChildrenProps = {
  results?: ResultsDiagnosisSubclinical | null;
  doctorName: string;
  status: ExaminationCardsDetailStatus;
  index: number;
  created_at?: string;
  serviceName: string;
};

const SubclinicalItemChildren: FC<SubclinicalItemChildrenProps> = ({
  serviceName,
  results,
  index,
  doctorName,
  created_at,
  status,
}) => {
  const styles = useStyles();
  const [image, setImage] = useState<string[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [idxImg, setIdxImg] = useState(0);

  const result = useMemo(() => results || null, [results]);

  const handleClickImage = useCallback((index: number) => {
    setIdxImg(index);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!results || !results?.images?.length) return;

    setImage(results.images.map((t) => t.url));
  }, [results]);

  return (
    <View style={styles.wrapperCardItem}>
      {image.length ? (
        <ImageView
          images={image.map((r) => ({ uri: r }))}
          imageIndex={idxImg}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : null}

      <View style={styles.content}>
        <BookingItemLabel label="STT" value={`${index}`} />
        <BookingItemLabel color={ColorSchemas.blueV2} label="Tên CLS/DV" value={serviceName} />
        <BookingItemLabel label="Bác sĩ chỉ định" value={`${doctorName || "Không có"}`} />
        <BookingItemLabel
          label="Trạng thái"
          value={convertExaminationCardDetailStatus(status!)}
          color={convertExaminationCardDetailStatusColor(status!)}
        />
        <BookingItemLabel
          label="Ngày chỉ định"
          value={formatDate(created_at || "", "DD/MM/YYYY")}
        />

        {result ? (
          <>
            <View style={styles.line} />

            <Text style={styles.title}>Kết quả chuẩn đoán</Text>

            <BookingItemLabel label="Kết quả" value={`${result.results}`} />

            <BookingItemLabel label="Đánh giá" value={result.rate} />

            {image.length ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
                {image.map((r, i) => (
                  <Pressable
                    key={r}
                    onPress={() => handleClickImage(i)}
                    style={{
                      borderWidth: 1,
                      width: scale(90),
                      height: scale(80),
                      borderColor: ColorSchemas.grey,
                      borderRadius: 4,
                    }}
                  >
                    <Image
                      source={{ uri: r }}
                      style={{
                        borderRadius: 4,
                        width: "100%",
                        height: "100%",
                      }}
                      contentFit="cover"
                      placeholder={BLUR_HASH}
                      transition={3000}
                    />
                  </Pressable>
                ))}
              </View>
            ) : null}
          </>
        ) : null}
      </View>
    </View>
  );
};

export default SubclinicalItemChildren;

const useStyles = () => {
  return StyleSheet.create({
    line: {
      width: "100%",
      height: 1,
      backgroundColor: ColorSchemas.grey,
      marginVertical: verticalScale(15),
    },
    wrapperCardItem: {
      flex: 1,
      gap: scale(10),
      borderRadius: scale(12),
      padding: scale(10),
      backgroundColor: ColorSchemas.blueLighterV3,
    },
    image: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(13),
    },
    title: {
      ...textStyles.H5,
      fontWeight: "bold",
      marginBottom: 10,
    },
    content: {},
  });
};
