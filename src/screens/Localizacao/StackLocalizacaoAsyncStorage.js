import { createStackNavigator } from '@react-navigation/stack'
import FormLocalizacaoAsyncStorage from './FormLocalizacaoAsyncStorage'
import ListaLocalizacaoAsyncStorage from './ListaLocalizacaoAsyncStorage'




const Stack = createStackNavigator()

export default function StackLocalizacaoAsyncStorage() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaLocalizacaoAsyncStorage'
        >
            <Stack.Screen name='ListaLocalizacaoAsyncStorage' component={ListaLocalizacaoAsyncStorage} />
            <Stack.Screen name='FormLocalizacaoAsyncStorage' component={FormLocalizacaoAsyncStorage} />
        </Stack.Navigator>
    )
}
