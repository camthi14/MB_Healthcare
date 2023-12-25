import { ColorSchemas } from "@/constants/colors";
import { ExaminationCardsDetailType } from "@/models/examinationCardDetails.model";
import { scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import React, { FC, useCallback } from "react";
import { FlatList, SectionListRenderItemInfo, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SubclinicalItemChildren from "./SubclinicalItemChildren";
import { ISubclinical } from "@/models/subclinical.model";

type SubclinicalItemProps = {
  data: ExaminationCardsDetailType;
  index: number;
};

const SubclinicalItem: FC<SubclinicalItemProps> = ({ data, index }) => {
  const styles = useStyles();

  const renderItem = useCallback(
    ({ item, index }: SectionListRenderItemInfo<ISubclinical>) => (
      <SubclinicalItemChildren
        index={index + 1}
        serviceName={item.name}
        doctorName={data?.doctorName || ""}
        status={data.status!}
        results={item.results}
        created_at={data.created_at}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: ISubclinical, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.lineV2} />;
  }, []);

  return (
    <View style={styles.wrapperCardItem}>
      <SubclinicalItemChildren
        serviceName={
          data.subclinicalData
            ? (data.subclinicalData as ISubclinical).name
            : `Gói DV: ${data.serviceData?.name}`
        }
        doctorName={data?.doctorName || ""}
        status={data?.status!}
        index={index}
        results={data?.results}
        created_at={data.created_at}
      />

      {data?.serviceData && data?.serviceData?.subclinicalData?.length ? (
        <View>
          <Text style={styles.title}>Chi tiết gói khám</Text>
          <View style={styles.lineV2} />

          <FlatList
            data={data.serviceData.subclinicalData}
            keyExtractor={keyExtractor}
            renderItem={renderItem as any}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SubclinicalItem;

const useStyles = () => {
  return StyleSheet.create({
    line: {
      width: "100%",
      height: 1,
      backgroundColor: ColorSchemas.grey,
      marginVertical: verticalScale(15),
    },
    lineV2: {
      width: "100%",
      height: 1,
      backgroundColor: ColorSchemas.blueV2,
      marginVertical: verticalScale(20),
    },
    wrapperCardItem: {
      flex: 1,
      gap: scale(10),
      borderRadius: scale(12),
      padding: scale(10),
      backgroundColor: ColorSchemas.white,
    },
    image: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(13),
    },
    title: {
      ...textStyles.H5,
      fontWeight: "bold",
    },
    content: {},
  });
};
