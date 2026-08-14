import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";

export default function SignupScreen() {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('testpass123');
    const [phone, setPhone] = useState('');
    const { signup, loading } = useContext(AuthContext);
    const router = useRouter();

    const handleSignup = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password required');
            return;
        }
        try {
            await signup(email, password, phone);
            router.replace('/(app)/home');
        } catch (err) {
            Alert.alert('Signup Failed', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Reckoning</Text>

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

            <TextInput 
                style={styles.input}
                placeholder="Phone (optional)"
                placeholderTextColor="#666"
                value={phone}
                onChangeText={setPhone}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Creating...' : "Create Account"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(auth)/login' )}>
                <Text style={styles.link}>Already have an account? Login</Text>
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