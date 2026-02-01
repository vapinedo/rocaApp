import { AppRouter } from '@src/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from '@shared/components/NotificationProvider';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </QueryClientProvider>
  );
}