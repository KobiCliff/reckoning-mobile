import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getWallet, getGoals, submitReport } from '../../src/api/goals'

export default function HomeScreen() {
    const router = useRouter();
    const [wallet, setWallet] = useState(null);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [walletRes, goalsRes] = await Promise.all([ 
                getWallet(),
                getGoals(),
             ]);
             setWallet(walletRes.data.wallet);
             setGoals(goalsRes.data.goals.filter(g => g.status === 'active'));
        } catch (err) {
            Alert.alert('Error', 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async(goalId) => {
        try {
            await submitReport(goalId);
            Alert.alert('Success', 'Report submitted');
            fetchData();
        } catch (err) {
            Alert.alert('Error', err.response?.data?.error || 'Failed to submit');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reckoning</Text>
                <Text style={styles.subtitle}>Welcome back</Text>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceValue}>₦{wallet ? wallet.balance : 0}</Text>
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceMeta}>Deposited: ₦{wallet ? wallet.total_deposited : 0}</Text>
                    <Text style={styles.balanceMeta}>Charged: ₦{wallet ? wallet.total_charged : 0}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today&apos;s Commitment</Text>
                {goals.length === 0 ? (
                    <Text style={styles.emptyText}>No goals created yet</Text>
                ) : (
                    goals.map((goal) => (
                        <View key={goal.id} style={styles.goalCard}>
                            <View style={styles.goalHeader}>
                                <Text style={styles.goalName}>{goal.name}</Text>
                                <Text style={styles.goalStake}>₦{goal.stake_amount}</Text>
                            </View>
                            <Text style={styles.goalMeta}>{goal.frequency}</Text>
                            <TouchableOpacity
                                style={styles.reportBtn}
                                onPress={() => handleReport(goal.Id)}
                            >
                                <Text style={styles.reportBtnText}>Report Done</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
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
        fontSize: 28,
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
        padding: 20,
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
        fontSize: 36,
        fontWeight: '800',
        color: '#e8e8e8',
        marginBottom: 12,
    },
    balanceRow: {
        display: 'flex',
        gap: 12,
    },
    balanceMeta: {
        fontSize: 11,
        color: '#666',
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
    goalCard: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    goalName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#e8e8e8',
    },
    goalStake: {
        backgroundColor: '#991b1b1',
        color: '#fca5a5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        fontSize: 11,
        fontWeight: '700',
    },
    goalMeta: {
        fontSize: 11,
        color: '#666',
        marginBottom: 12,
    },
    reportBtn: {
        backgroundColor: '#991b1b',
        paddingVertical: 10,
        borderRadius: 8,
    },
    reportBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 13,
    },
});
