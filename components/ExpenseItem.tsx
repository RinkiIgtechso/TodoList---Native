import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../types';

export default function ExpenseItem({ expense }: { expense: Expense }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text>₹{expense.amount}</Text>
      <Text>{expense.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4
  }
});
