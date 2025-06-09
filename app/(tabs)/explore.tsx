import { Dimensions, StyleSheet, Text, View } from 'react-native'; 

export default function TabTwoScreen() {

  const deviceHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.headerImage, { height: deviceHeight, maxHeight: deviceHeight }]}>
      <Text>Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    backgroundColor: '#fff', 
  },
});
