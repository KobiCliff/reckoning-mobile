import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { getGoals, createGoal } from '../../src/api/goals';

export default function GoalsScreen() {
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [stake, setStake] = useState('');
    const [creatingGoal, setCreatingGoal] = useState(false);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const res = await getGoals();
            setGoals(res.data.goals);
        } catch (err) {
            Alert.alert('Error', 'Failed to load goals');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!name || !stake) {
            Alert.alert('Error', 'Name and stake required');
            return
        }

        try {
            setCreatingGoal(true);
            await createGoal(name, frequency, parseFloat(stake));
            Alert.alert('Success', 'Goal created');
            setName('');
            setStake('');
            setShowForm(false);
            fetchGoals();
        } catch (err) {
            Alert.alert('Error', err.response?.data.error || 'Failed');
        } finally {
            setCreatingGoal(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Goals</Text>
                <Text style={styles.subtitle}>Manage your commitment</Text>
            </View>

            <TouchableOpacity
                style={styles.createBtn}
                onPress={() => setShowForm(!showForm)}
            >
                <Text style={styles.createBtnText}>+ Create New Goal</Text>
            </TouchableOpacity>

            {showForm && (
                <View style={styles.form}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Goal name"
                        placeholderTextColor= "#666"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={styles.frequencyRow}>
                        <TouchableOpacity
                            style={[styles.freqBtn, frequency === 'daily' && styles.active]}
                            onPress={() => setFrequency('daily')}
                        >
                            <Text style={styles.freqText}>Daily</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.freqBtn, frequency === 'weekly' && styles.active]}
                            onPress={() => setFrequency('weekly')}
                        >
                            <Text style={styles.freqText}>Weekly</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Stake (₦)'
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        value={stake}
                        onChangeText={setStake}
                    />
                    <TouchableOpacity style={styles.submitBtn} onPress={handleCreate} disabled={creatingGoal}>
                        <Text style={styles.submitBtnText}>{creatingGoal ? 'Creating...' : 'Create'}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.goalsList}>
                {goals.length === 0 ? (
                    <Text style={styles.emptyText}>No goals yet</Text>
                ) : (
                    goals.map((goal) => (
                        <View key={goal.id} style={styles.goalItem}>
                            <View style={styles.goalInfo}>
                                <Text style={styles.goalName}>{goal.name}</Text>
                                <Text style={styles.goalMeta}>{goal.frequency} • ₦{goal.stake_amount}</Text>
                            </View>
                            <Text style={[styles.status, goal.status === 'active' && styles.active]}>
                                {goal.status === 'active' ? '●' : '○'}
                            </Text>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
};


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
    createBtn: {
        backgroundColor: '#991b1b',
        paddingVertical: 12,
        borderRadius: 8,
        marginVertical: 20,
    },
    createBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
    form: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#0a0a0a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: '#e8e8e8',
        marginBottom: 12,
        fontSize: 14,
    },
    frequencyRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    freqBtn: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        paddingVertical: 10,
        borderRadius: 6,
    },
    active: {
        backgroundColor: '#991b1b',
        borderColor: '#991b1b',
    },
    freqText: {
        color: '#e8e8e8',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 12,
    },
    submitBtn: {
        backgroundColor: '#991b1b',
        paddingVertical: 10,
        borderRadius: 6,
    },
    submitBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
    goalsList: {
        marginBottom: 30,
    },
    emptyText: {
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    goalItem: {
        backgroundColor: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goalInfo: {
        flex: 1,
    },
    goalName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#e8e8e8',
        marginBottom: 4,
    },
    goalMeta: {
        fontSize: 11,
        color: '#666',
    },
    status: {
        fontSize: 20,
        color: '#666',
    },
    textInput: {
        backgroundColor: '#0a0a0a',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },
    textInputPlaceholder: {
        color: '#666',
        fontSize: 14,
    },
});