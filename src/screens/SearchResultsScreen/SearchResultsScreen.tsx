import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Container from "@/components/shared/Container";
import { Appbar } from "react-native-paper";
import useGoBack from "@/hooks/useGoBack";

type SearchResultsScreenProps = {};

const SearchResultsScreen: FC<SearchResultsScreenProps> = () => {
  const { onGoBack } = useGoBack();

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title="Tra cứu kết quả" />
      </Appbar.Header>
    </Container>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({});
