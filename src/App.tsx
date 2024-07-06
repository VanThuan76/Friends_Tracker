import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/shared/theme';
import { storage } from '@shared/utils/localStorage';
import { store } from '@/store';

import OnboardingScreen from '@screens/main/onboarding/OnboardingScreen';
import LoadingView from '@components/views/LoadingView';

import ApplicationNavigator from './navigators/Application';
import './shared/translations';

export const queryClient = new QueryClient();

const Stack = createStackNavigator();

function App() {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider storage={storage}>
						<NavigationContainer fallback={<LoadingView isLoading={true} />}>
							<Stack.Navigator initialRouteName="Onboarding">
								<Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
								<Stack.Screen name="Main" component={ApplicationNavigator} options={{ headerShown: false }} />
							</Stack.Navigator>
						</NavigationContainer>
					</ThemeProvider>
				</QueryClientProvider>
			</Provider>
		</SafeAreaProvider>
	);
}

export default App;
