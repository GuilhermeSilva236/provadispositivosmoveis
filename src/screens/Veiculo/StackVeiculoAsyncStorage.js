import { createStackNavigator } from '@react-navigation/stack'
import FormVeiculoAsyncStorage from './FormVeiculoAsyncStorage'
import ListaVeiculoAsyncStorage from './ListaVeiculoAsyncStorage'




const Stack = createStackNavigator()

export default function StackVeiculosAsyncStorage() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaVeiculoAsyncStorage'
        >
            <Stack.Screen name='ListaVeiculoAsyncStorage' component={ListaVeiculoAsyncStorage} />
            <Stack.Screen name='FormVeiculoAsyncStorage' component={FormVeiculoAsyncStorage} />
        </Stack.Navigator>
    )
}
