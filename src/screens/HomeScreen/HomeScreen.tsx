import Container from "@/components/shared/Container";
import AppBarMain from "@/components/ui/AppBarMain";
import { ColorSchemas } from "@/constants/colors";
import { SocketEventsName } from "@/constants/socket";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { doctorActions } from "@/features/doctor/doctorSlice";
import { specialtyActions } from "@/features/specialty/specialtySlice";
import { socket } from "@/services/socket";
import { useAppDispatch } from "@/stores/hooks";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import SectionsHome from "./components/SectionsHome";

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(0);
  const { userId } = useAuth();

  useFocusEffect(
    useCallback(() => {
      dispatch(appActions.setLoading(true));
      dispatch(specialtyActions.getDataStart());
      dispatch(doctorActions.getDataStart({}));
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      socket.connect();

      socket.emit(SocketEventsName.GET_COUNT_NOTIFICATION, { userId });

      socket.on(SocketEventsName.GET_COUNT_NOTIFICATION, (countInput) => {
        setCount(Number(countInput));
      });

      return () => {
        socket.off("connect_error");
      };
    }, [userId])
  );

  useEffect(() => {
    if (!userId) return;
    socket.connect();

    let _count = 0;

    socket.on(SocketEventsName.NOTIFICATION, (data) => {
      _count += 1;
      socket.emit(SocketEventsName.GET_COUNT_NOTIFICATION, { userId });
      setCount((prev) => prev + _count);
    });
  }, [userId]);

  return (
    <Container style={{ backgroundColor: ColorSchemas.greyLighterV3 }}>
      <AppBarMain count={count} />

      <SectionsHome />
    </Container>
  );
};

export default HomeScreen;
