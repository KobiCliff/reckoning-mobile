import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";

export default function LoginScreen() {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('testpass123');
    const { login, loading } = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password){
            Alert.alert('Error', 'Email and password required');
            return;
        }

        try {
            await login(email, password);
            router.replace('/(app)/home');
        } catch (err) {
            Alert.alert('Login Failed', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reckoning</Text>
            <Text style={styles.subtitle}>Commitment Accountability</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : "Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={styles.link}>Don&apos;t have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#e8e8e8',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 40,
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#e8e8e8',
        marginBottom: 12,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#991b1b',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        textAlign:'center',
        letterSpacing: 0.5,
    },
    link: {
        color: '#666',
        textAlign:'center',
        marginTop: 16,
        fontSize: 12,
    },
});