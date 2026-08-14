import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";

export default function HomeScreen() {
    const { logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reckoning</Text>
                <Text style={styles.subtitle}>Welcome back</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Balance</Text>
                <Text style={styles.cardValue}>N0</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today&apos;s Commitment</Text>
                <Text style={styles.emptyText}>No goals created yet</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
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
    cardLabel: {
        fontSize: 10,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 32,
        fontWeight: '800',
        color: '#e8e8e8',
    },
    section: {
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#e8e8e8',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 12,
        color: '#666',
    },
    button: {
        backgroundColor: '#991b1b',
        paddingVertical: 14,
        borderRadius: 8,
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        textAlign:'center',
    },
});
