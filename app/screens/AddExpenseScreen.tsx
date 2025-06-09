import { Expense } from '@/types';
import { loadExpenses, saveExpenses } from '@/utils/storage';
import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native'; 
import { v4 as uuidv4 } from 'uuid';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;  
}

export default function AddExepenseModal({
  visible,
  onClose,
}: CustomModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => { 
    if (!title || !amount) {
      Alert.alert('Validation', 'Please enter title and amount');
      return;
    }

    const newExpense: Expense = {
      id: uuidv4(),
      title,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0]
    };

    const current = await loadExpenses();
    const updated = [...current, newExpense];
    await saveExpenses(updated); 
    setTitle('');
    setAmount('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalBox]}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />
          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />
          <Button title="Add Expense" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 5
  }
});
