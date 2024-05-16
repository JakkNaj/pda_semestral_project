import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import tabs from "./tabs.js";
import colors from "../components/common/colors";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View} from "react-native";
import {useSafeAreaStyles} from "../components/common/View.styles";

const AppNavigator = () => {

    const Tab = createBottomTabNavigator();
    const safeAreaStyles = useSafeAreaStyles();

    return (
        <Tab.Navigator
            initialRouteName="Discover"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    const tab = tabs.find((t) => t.label === route.name);
                    return (
                        <Icon size={size} color={color} name={tab.icon} />
                    );
                },
                tabBarActiveTintColor: colors.purple,
                tabBarInactiveTintColor: colors.grey,
            })}
        >
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.key}
                    name={tab.label}

                    options={{
                        tabBarLabel: tab.label,
                        tabBarIcon: ({ color, size }) => (
                            <Icon size={size} color={color} name={tab.icon} />
                        ),
                    }}
                >
                    {() => (
                        <View style={safeAreaStyles.container}>
                            {tab.component}
                        </View>
                    )}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    )
   
}

export default AppNavigator