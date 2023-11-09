import { createStackNavigator } from '@react-navigation/stack'
import FormInscrevaAsyncStorage from './FormInscrevaAsyncStorage.js'
import ListaInscrevaAsyncStorage from './ListaInscrevaAsyncStorage.js'




const Stack = createStackNavigator()

export default function StackAlunosAsyncStorage() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaInscrevaAsyncStorage'
        >
            <Stack.Screen name='ListaInscrevaAsyncStorage' component={ListaInscrevaAsyncStorage} />
            <Stack.Screen name='FormInscrevaAsyncStorage' component={FormInscrevaAsyncStorage} />
        </Stack.Navigator>
    )
}
