/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {  StyleSheet, View } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen'

function App() {

  return (
    <SafeAreaProvider style={styles.screen}>
      <HomeScreen />
      
    </SafeAreaProvider>
  );
}




const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffff',

  },
});

export default App;
