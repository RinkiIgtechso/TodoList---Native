import { ActivityIndicator, ActivityIndicatorBase, Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler' 
import { Colors1 } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen() {
  const { top: safeTop } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editTask, setEditTask] = useState<{id: number; name: string} | null>(null);
  const [list, setList] = useState<{id: number; name: string}[]>([{
    id: 1,
    name: "This is the first task."
  }])
  const deviceHeight = Dimensions.get('window').height;

  const handleEdit = (task:{id: number; name: string}) => {
    setSearchQuery(task.name);
    setEditTask(task); 
  }

  const handleDelete = (task:{id: number; name: string}) => {
    setList((prev)=>prev.filter((data)=> data.id !== task.id))
  }

  const handleSubmit = (event: any) => {
     
    if(searchQuery){
      if(editTask){
        setList((prev)=> {
          let data = prev.map((item)=>{
            if(item.id === editTask.id){
              return { ...item, name: searchQuery };
            }
            return item;
          });

          return data;
        })
        setEditTask(null);
        setSearchQuery("");
      }else{
        setList((prev)=>[...prev, {
          id: prev.length +1,
          name: searchQuery
        }])
      }
      setSearchQuery("");
    }else{
      alert("First enter the task.")
    }
  }
  
  return (
    // <ScrollView>
      <GestureHandlerRootView style={[styles.container, { paddingTop: safeTop }]}>
        <View style={styles.innerContainer}>
          <View style={styles.heading}>
            <Text style={styles.emoji}>🎉</Text>
            <Text style={styles.title}>Welcome!</Text>
          </View>
          <View style={styles.todo}>
            <View>
              <View style={[styles.container1, {paddingHorizontal: 20}]}>
                <View style={styles.searchBar}>
                  {/* <Ionicons name='search-outline' size={20} color={Colors1.lightGrey} /> */}
                  <TextInput
                    placeholder='Enter task'
                    placeholderTextColor={Colors1.lightGrey}
                    style={styles.searchText}
                    autoCapitalize='none'
                    value={searchQuery}
                    onChangeText={query => setSearchQuery(query)}
                    onSubmitEditing={handleSubmit}  // <-- Add this line
                    returnKeyType="search"           // (optional) changes keyboard key to "Search"
                  />
                  <TouchableOpacity style={[styles.addButton, styles.borders]} onPress={handleSubmit}>
                    {/* <Text style={styles.editButtonText}>Edit</Text> */}
                    <Ionicons name='add-outline' size={20} color={Colors1.lightGrey} />
                  </TouchableOpacity>
                  {/* <Button title='Submit' onPress={handleSubmit} /> */}
                </View>
              </View>
              <View>
                <View style={[styles.todoList, { maxHeight: deviceHeight - 240 }]}>
                  <FlatList
                    data={list}
                    keyExtractor={(_, index) => `list_item${index}`}
                    renderItem={({item, index}) => {
                      return (
                        <View key={index} style={styles.list}>
                          <View style={[styles.flexItem, { flex: 1 }]}>
                            <Text style={styles.number}>{item.id}</Text>
                            <Text style={styles.taskHeading}>{item.name}</Text>
                          </View>
                          <View style={[styles.flexItem, { width: 80 }]}>
                            <TouchableOpacity style={[styles.editButton ]} onPress={() => handleEdit(item)}>
                              {/* <Text style={styles.editButtonText}>Edit</Text> */}
                              <Ionicons name="create-outline" size={18}  />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.editButton ]} onPress={() => handleDelete(item)}>
                              {/* <Text style={styles.editButtonText}>Edit</Text> */}
                              <Ionicons name="trash-outline" size={18}  />
                            </TouchableOpacity> 
                          </View>
                        </View>
                      )
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
    </GestureHandlerRootView>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors1.black
  },
  emoji: {
    fontSize: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors1.white
  },
  todo: {
    flex: 1, 
    borderWidth: 1,
    borderColor: Colors1.tint,
    height: 100,
    padding: 20
  },
  container1: { 
    marginBottom: 20
  },
  searchBar: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection:'row',
    alignItems:'center',
    gap: 10
  },
  searchText: {
    fontSize: 14,
    flex: 1,
    color: Colors1.darkGrey,
    outlineColor: 'transparent', 
    borderColor: '#fff',
    outlineWidth: 0
  },
  todoList: { 
    marginHorizontal:15,
    backgroundColor: '#fcf3f7',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cb1d63',
    borderStyle: 'solid',
    maxHeight: 300,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
  },
  flexItem:{
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center', 
  },
  list: {
    flexDirection: 'row',
    // gap:10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: 17,
    paddingInline: 15,
    width:'100%' 
  },
  number:{
    fontSize: 16, 
    color: Colors1.darkGrey,
    backgroundColor: "#fff",
    borderRadius: 50,
    maxWidth: 30,
    height: 30, 
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
  },
  taskHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors1.darkGrey
  }, 
  borders:{
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2, 
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  addButton:{
    borderColor: '#000000'
  },
  editButton: {
    borderColor: Colors1.tint, 
  },
  editButtonText: {
    color: Colors1.darkGrey, 
    fontWeight: '600',
    fontSize: 13
  }
});
