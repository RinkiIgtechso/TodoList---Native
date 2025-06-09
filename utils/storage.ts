import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from '../types'

const STORAGE_KEY = "expenses";

export const saveExpenses = async ( expenses: Expense[] ) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
        console.log("Failed to save expenses", error);
    }
}

export const loadExpenses = async (): Promise<Expense[]> => {
    try {
        const res = await AsyncStorage.getItem(STORAGE_KEY);
        return res ? JSON.parse(res) : [];
    } catch (error) {
        console.log("Failed to load resources", error);
        return [];
    }
}