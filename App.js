import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import ContactList from './screens/ContactList';

export default function App() {
  return (
    // <View style={tw`flex-1 items-center justi  fy-center bg-yellow-200`}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <ContactList />
  );
}

