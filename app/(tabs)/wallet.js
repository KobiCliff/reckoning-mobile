import React, { useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { getWallet } from "../../src/api/goals"; 

export default function WalletScreen() {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            const res = await getWallet();
            setWallet(res.data.wallet);
        } catch (err) {
            Alert.alert('Error', 'Failed to load wallet');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Wallet</Text>
                <Text style={styles.subtitle}>Balance & Transactions</Text>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={styles.balanceValue}>₦{wallet?.balance || 0}</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Deposited</Text>
                    <Text style={styles.statValue}>₦{wallet?.total_deposited || 0}</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Charged</Text>
                    <Text style={[styles.statValue, { color: '#fca5a5' }]}>₦{wallet?.charged || 0}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.depositBtn}>
                <Text style={styles.depositBtnText}>+ Deposit Funds</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        paddingHorizontal: 20,
    },
    loadingText: {
        color: 'e8e8e8',
        textAlign: 'center',
        marginTop: 50,
    },
    header: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#e8e8e8',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
    },
    balanceCard: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 12,
        padding: 24,
        marginVertical: 20,
    },
    balanceLabel: {
        fontSize: 10,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        fontWeight: '700',
    },
    balanceValue: {
        fontSize: 40,
        fontWeight: '800',
        color: '#e8e8e8',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 10,
        padding: 16,
    },
    statLabel: {
        fontSize: 10,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
        fontWeight: '700',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#e8e8e8',
    },
    depositBtn: {
        backgroundColor: '#991b1b',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 20,
    },
    depositBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 14,
    },
    section: {
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 12,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        fontWeight: '700',
    },
    emptyText: {
        fontSize: 12,
        color: '#666',
    },
});