import { createStackNavigator } from '@react-navigation/stack'
import ListaCondutoresAsyncStorage from './ListaCondutoresAsyncStorage'
import FormCondutoresAsyncStorage from './FormCondutoresAsyncStorage'




const Stack = createStackNavigator()

export default function StackcondutoresAsyncStorage() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCondutoresAsyncStorage'
        >
            <Stack.Screen name='ListaCondutoresAsyncStorage' component={ListaCondutoresAsyncStorage} />
            <Stack.Screen name='FormCondutoresAsyncStorage' component={FormCondutoresAsyncStorage} />
        </Stack.Navigator>
    )
}
