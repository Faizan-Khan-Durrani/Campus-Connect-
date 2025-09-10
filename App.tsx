import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lightTheme, darkTheme } from './styles/colors';
import EventDashboard from './screens/EventDashboard';
import EventDetail from './screens/EventDetail';
import RegistrationSuccess from './screens/RegistrationSuccess';
import ThemeToggle from './components/ThemeToggle';
import FeedbackFormScreen from './screens/FeedbackFormScreen';
import FeedbackManagement from './screens/FeedbackManagement';
import RegisteredEvents from './screens/RegisteredEvents';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import EventRegistrationScreen from './screens/EventRegisterationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EventStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="CampusConnect +
    " component={EventDashboard}  />
    <Stack.Screen name="EventDetail" component={EventDetail} options={{ title: 'Event Details' }} />
    <Stack.Screen name="EventRegistration" component={EventRegistrationScreen} options={{ title: 'Register Event' }} />
    <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} options={{ title: "Registration Successful" }} />
    <Stack.Screen name="FeedbackForm" component={FeedbackFormScreen} options={{ title: 'Submit Feedback' }} />
  </Stack.Navigator>
);

const FeedbackStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Manage Feedback" component={FeedbackManagement} />
  </Stack.Navigator>
);

const RegisterStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Registered Events" component={RegisteredEvents} options={{ title: 'Events Registered' }} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Event Dashboard" component={EventStackNavigator} options={{ headerShown: false }} />
    <Tab.Screen name="Registered Events" component={RegisteredEvents} />
    <Tab.Screen name="Manage Feedback" component={FeedbackManagement} />
  </Tab.Navigator>
);

const AppContent = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: isDarkMode ? darkTheme.surface : lightTheme.surface,
          text: isDarkMode ? darkTheme.text : lightTheme.text,
          primary: isDarkMode ? darkTheme.primary : lightTheme.primary,
          card: isDarkMode ? darkTheme.background : lightTheme.background,
          border: '#ccc',
          notification: '#f50057',
        },
        dark: isDarkMode,
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '800' },
        }
      }}
    >
      <ThemeToggle />
      <MainTabNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
