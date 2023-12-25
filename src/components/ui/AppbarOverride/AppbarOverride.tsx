import useGoBack from "@/hooks/useGoBack";
import React, { FC, ReactNode, useCallback } from "react";
import { Appbar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppDispatch } from "@/stores/hooks";
import { bookingActions } from "@/features/booking/bookingSlice";

type AppbarOverrideProps = {
  title: string;
  isGoBack?: boolean;
  children?: ReactNode;
  isHome?: ReactNode;
  resetBooking?: boolean;
};

const AppbarOverride: FC<AppbarOverrideProps> = ({
  title,
  isGoBack,
  isHome,
  children,
  resetBooking,
}) => {
  const dispatch = useAppDispatch();
  const { onGoBack, onGoHome } = useGoBack();

  const goHome = useCallback(() => {
    if (resetBooking) {
      dispatch(bookingActions.resetBooking());
    }

    onGoHome();
  }, [resetBooking]);

  return (
    <Appbar.Header>
      {isGoBack ? <Appbar.BackAction onPress={onGoBack} /> : null}
      <Appbar.Content title={title} />

      {children}

      {isHome ? (
        <Appbar.Action
          animated={false}
          icon={() => <FontAwesome5 name="home" size={24} color="black" />}
          onPress={goHome}
        />
      ) : null}
    </Appbar.Header>
  );
};

export default AppbarOverride;
