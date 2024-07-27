import RootNavigator from '../components/RootNavigator'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text } from 'react-native';

const queryClient = new QueryClient();

export default function _layout() {
  return (
    <RootNavigator />
  )
};