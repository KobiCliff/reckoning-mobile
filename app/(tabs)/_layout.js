import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./home";
import GoalsScreen from "./goals";
import WalletScreen from "./wallet";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();


export default function TabsLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0a0a0a',
                    borderTopColor: '#1a1a1a',
                    borderTopWidth: 1,
                },
                tabBarActiveTintColor: '#991b1b',
                tabBarInactiveTintColor: '#666',
            }}
        >
            <Tab.Screen 
                name="home"
                component={HomeScreen}
                options={{
                    title:'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />
             <Tab.Screen 
                name="goals"
                component={GoalsScreen}
                options={{
                    title:'Goals',
                    tabBarIcon: ({ color }) => <Ionicons name="flag" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="wallet"
                component={WalletScreen}
                options={{
                    title:'Wallet',
                    tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />,
                }}
            />
            <Tab.Screen 
                name="profile"
                component={ProfileScreen}
                options={{
                    title:'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}