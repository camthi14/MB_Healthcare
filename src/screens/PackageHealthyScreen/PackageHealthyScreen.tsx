import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Container from "@/components/shared/Container";
import { Appbar } from "react-native-paper";
import useGoBack from "@/hooks/useGoBack";

type PackageHealthyScreenProps = {};

const PackageHealthyScreen: FC<PackageHealthyScreenProps> = () => {
  const { onGoBack } = useGoBack();

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title="Gói khám sức khoẻ" />
      </Appbar.Header>
    </Container>
  );
};

export default PackageHealthyScreen;

const styles = StyleSheet.create({});
