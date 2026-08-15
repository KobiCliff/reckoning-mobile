import React, {useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";

export default function ProfileScreen() {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>Account settings</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user?.email}</Text>
                </View>
                <View style={[styles.row, { borderTopWidth: 1, borderTopColor: '#2a2a2a' }]}>,
                    <Text style={styles.label}>Member Since</Text>
                    <Text style={styles.value}>Today</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#e8e8e8',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 12,
        padding: 20,
        marginVertical: 20,
    },
    row: {
        paddingVertical: 12,
    },
    label: {
        fontSize: 10,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 6,
        fontWeight: '700',
    },
    value: {
        fontSize: 14,
        color: '#e8e8e8',
        fontWeight: '600',
    },
    logoutBtn: {
        backgroundColor: '#2a2a2a',
        paddingVertical: 14,
        borderRadius: 8,
    },
    logoutBtnText: {
        color: '#e8e8e8',
        textAlign:'center',
        fontWeight: '700',
    },
});