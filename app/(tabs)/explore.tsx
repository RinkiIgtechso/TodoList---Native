import { Expense } from "@/types";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddExepenseModal from "../screens/AddExpenseScreen";
import { loadExpenses } from "@/utils/storage";

const dummyData = [
  {
    id: "1",
    title: "Coffee",
    amount: 150,
    date: "2025-06-09",
  },
];

export default function TabTwoScreen() {
  const router = useRoute();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const deviceHeight = Dimensions.get("window").height;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await loadExpenses();
      setExpenses(data);
    };
    fetchExpenses();
  }, [isModalVisible]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Total Spent: ₹0</Text> */}
      <Text style={styles.header}>Total Spent: ₹{total}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>₹{item.amount}</Text>
            <Text>{item.date}</Text>
          </View>
        }
      />
      <Button title="Add New Expense" onPress={() => setIsModalVisible(true)} />

      <AddExepenseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
