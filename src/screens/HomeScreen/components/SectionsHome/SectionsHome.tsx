import DoctorItem from "@/components/shared/DoctorItem";
import SpecialtyItem from "@/components/shared/SpecialtyItem";
import { useDoctor } from "@/features/doctor/doctirSelector";
import { useSpecialty } from "@/features/specialty/specialtySelector";
import { IDoctorResponse } from "@/models/doctor.model";
import { ISpecialist } from "@/models/specialty.model";
import { MARGIN_BOTTOM_NAV } from "@/utils/scale";
import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, ScrollView, Text, View } from "react-native";
import ActionsHome from "../ActionsHome";
import ListCarousel from "../ListCarousel";
import useStyles from "./SectionHomeStyles";

const SectionsHome: FC = () => {
  const styles = useStyles();
  const { data } = useSpecialty();
  const { data: doctors } = useDoctor();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ISpecialist>) => <SpecialtyItem row={item} />,
    []
  );

  const renderItemDoctor = useCallback(
    ({ item }: ListRenderItemInfo<IDoctorResponse>) => <DoctorItem row={item} />,
    []
  );

  const keyExtractorRenderSpecialty = useCallback(
    (item: ISpecialist, index: number) => `${item.id}`,
    []
  );

  const keyExtractorRenderDoctor = useCallback(
    (item: IDoctorResponse, index: number) => `${item.id}`,
    []
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
      <View>
        <ListCarousel />
      </View>

      <ActionsHome />

      <View style={styles.specialty}>
        <View style={styles.wrapperActions}>
          <Text style={styles.header}>Chuyên khoa</Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          nestedScrollEnabled
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractorRenderSpecialty}
        />
      </View>

      <View style={styles.specialty}>
        <View style={styles.wrapperActions}>
          <Text style={styles.header}>Bác sĩ nổi bật</Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          nestedScrollEnabled
          data={doctors}
          keyExtractor={keyExtractorRenderDoctor}
          renderItem={renderItemDoctor}
        />
      </View>

      <View style={{ marginBottom: MARGIN_BOTTOM_NAV }} />
    </ScrollView>
  );
};

export default SectionsHome;
