import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { IPatient, convertRelationship } from "@/models/patient.model";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";
import { fMoment } from "@/utils/formatTime";
import { scale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { Image } from "expo-image";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

type RelationshipItemProps = {
  row: IPatient;
  onEdit?: (row: IPatient) => void;
};

const RelationshipItem: FC<RelationshipItemProps> = ({ row, onEdit }) => {
  const styles = useStyles();

  return (
    <View style={styles.wrapperCardItem}>
      <View style={styles.wrapperContent}>
        {row?.photo ? (
          <Image
            source={{ uri: row.photo! }}
            style={styles.image}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={500}
          />
        ) : null}

        <View style={styles.content}>
          <BookingItemLabel label="Họ và tên: " value={row.display_name || ""} />

          {row.relationship !== "me" ? (
            <BookingItemLabel
              label="Quan hệ gia đình:"
              value={convertRelationship(row.relationship)}
            />
          ) : null}

          <BookingItemLabel label="Số điện thoại: " value={row.phone_number || ""} />
          <BookingItemLabel
            label="Ngày sinh: "
            value={fMoment(row?.infoData?.birth_date, "DD/MM/YYYY") || ""}
          />

          <View style={{ marginTop: 10 }}>
            <View>
              <Button
                onPress={() => onEdit?.(row)}
                mode="contained"
                buttonColor={ColorSchemas.blueLighterV3}
                textColor={ColorSchemas.blueV2}
                labelStyle={{ fontWeight: "700" }}
                style={{
                  borderRadius: 70,
                }}
              >
                Chỉnh sửa
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RelationshipItem;

const useStyles = () => {
  return StyleSheet.create({
    wrapperCardItem: {
      borderRadius: scale(12),
      padding: scale(10),
      backgroundColor: ColorSchemas.white,
      flex: 1,
    },
    wrapperContent: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: scale(10),
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
    content: {
      fontSize: scale(12),
      color: ColorSchemas.mutedDark,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 2,
    },
  });
};
