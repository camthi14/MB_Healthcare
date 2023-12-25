import Container from "@/components/shared/Container";
import Alert from "@/components/ui/Alert";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { usePatient } from "@/features/patient/patientSelector";
import { patientActions } from "@/features/patient/patientSlice";
import { IPatient } from "@/models/patient.model";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { SPACING } from "@/utils/scale";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, Pressable, RefreshControl, View } from "react-native";
import RelationshipItem from "./components/RelationshipItem";
import { Text } from "react-native-paper";

const ListRelationshipScreen: FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { data } = usePatient();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      dispatch(appActions.setLoading(true));
      dispatch(patientActions.getRelationshipStart(String(userId)));
    }, [userId])
  );

  const handleOnEdit = useCallback((row: IPatient) => {
    navigate("EditProfile", { patientId: row.id! });
  }, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IPatient>) => {
    return <RelationshipItem row={item} onEdit={handleOnEdit} />;
  }, []);

  const handleRefreshing = useCallback(() => {
    if (!userId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getRelationshipStart(String(userId)));
  }, [userId]);

  const keyExtractor = useCallback((item: IPatient, _: number) => item.id!, []);

  const renderListComponentHeader = useCallback(() => {
    if (!data || data.relatives?.length) return null;

    return (
      <View>
        <Alert text="Chưa có thành viên nào" />
      </View>
    );
  }, [data]);

  const onPressAddPatient = useCallback(() => {
    navigation.navigate("AddRelationship");
  }, []);

  return (
    <Container>
      <AppbarOverride title="Thành viên gia đình" isGoBack />

      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingRight: 15,
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={onPressAddPatient}
          style={{ backgroundColor: "green", padding: 5, borderRadius: 5 }}
        >
          <Text variant="labelLarge" style={{ color: "white" }}>
            Thêm thành viên
          </Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, padding: SPACING }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
          }
          refreshing={false}
          onRefresh={handleRefreshing}
          ListHeaderComponent={renderListComponentHeader}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }} />}
          data={data?.relatives || []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </Container>
  );
};

export default ListRelationshipScreen;
