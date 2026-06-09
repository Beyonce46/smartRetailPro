import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Toast from "./src/components/Toast";
import { AppProvider } from "./src/context/AppContext";

import AddProductScreen from "./src/screens/AddProductsScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import InventoryScreen from "./src/screens/InventoryScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SplashScreen from "./src/screens/SplashScreen";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: "#ffffff" },
        headerTitleStyle: { color: "#0f172a", fontWeight: "700", fontSize: 18 },
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e2e8f0",
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard")
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          else if (route.name === "Inventory")
            iconName = focused ? "cube" : "cube-outline";
          else if (route.name === "AddProduct")
            iconName = focused ? "add-circle" : "add-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerTitle: "Dashboard" }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ headerTitle: "Inventory" }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ headerTitle: "Add Product" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate splash screen loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : !isLoggedIn ? (
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main">
              {(props) => (
                <MainTabs {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </AppProvider>
  );
}
