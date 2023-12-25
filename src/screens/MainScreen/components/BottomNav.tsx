import { ColorSchemas } from "@/constants/colors";
import BookingScreen from "@/screens/BookingScreen";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarButtonProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC, ReactNode, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useStyles from "./BottomNavStyles";

const Tab = createBottomTabNavigator();

type BottomConfig = {
  name: string;
  icon: (color: string) => { focused: ReactNode; default: ReactNode };
  component: FC;
  button?: boolean;
  label: string;
};

type BottomNavProps = {};

type TabBarButtonProps = {
  children: ReactNode;
} & BottomTabBarButtonProps;

type TabItemProps = {
  focused: boolean;
  color: string;
  icon: (color: string) => { focused: ReactNode; default: ReactNode };
  name: string;
};

const TabItem: FC<TabItemProps> = ({ color, focused, name, icon }) => {
  const Icon = icon(color);
  const styles = useStyles(color);

  return (
    <View style={styles.tabBarItem}>
      <View>{focused ? Icon.focused : Icon.default}</View>
      <Text style={styles.tabBarItemText}>{name}</Text>
    </View>
  );
};

const TabBarButton: FC<TabBarButtonProps> = ({ children, onPress }) => {
  const styles = useStyles(ColorSchemas.blue);

  return (
    <TouchableOpacity
      style={[styles.buttonTabWrapper, styles.buttonTabView]}
      activeOpacity={0.86}
      onPress={onPress}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

const BottomNav: FC<BottomNavProps> = () => {
  const styles = useStyles();
  const bottomConfig = useMemo(
    (): BottomConfig[] => [
      {
        component: HomeScreen,
        icon: (color: string) => ({
          focused: <Entypo name="home" size={24} color={color} />,
          default: <Entypo name="home" size={24} color={color} />,
        }),
        name: "Home",
        label: "Trang chủ",
      },
      {
        component: BookingScreen,
        icon: (color: string) => ({
          focused: <MaterialCommunityIcons name="clipboard-list" size={24} color={"white"} />,
          default: (
            <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={"white"} />
          ),
        }),
        name: "Booking",
        label: "Lịch sử",
        button: true,
      },
      {
        component: ProfileScreen,
        icon: (color: string) => ({
          focused: <Ionicons name="person-circle" size={24} color={color} />,
          default: <Ionicons name="person-circle-outline" size={24} color={color} />,
        }),
        name: "Profile",
        label: "Cá nhân",
      },
    ],
    []
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: styles.activeColor.color,
      }}
    >
      {bottomConfig.map((config, index) => (
        <Tab.Screen
          key={index}
          name={config.name}
          component={config.component}
          options={{
            tabBarIcon: ({ color, focused, size }) =>
              config.button ? (
                config.icon(color).default
              ) : (
                <TabItem color={color} focused={focused} icon={config.icon} name={config.label} />
              ),
            ...(config.button
              ? {
                  tabBarButton(props) {
                    return config.button ? <TabBarButton {...props} /> : undefined;
                  },
                }
              : {}),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNav;
