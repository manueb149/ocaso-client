import '../src/styles/globals.scss';
import { CustomAppProps } from '../src/models/types.model';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Provider } from 'react-redux';
import { store } from '../config/configureStore';
import Notification from '../src/Components/Notification/Notification';

/**
 * App wrapper for global management
 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps<{ session: Session }>): JSX.Element {
  if (Component.layout) {
    return (
      <Provider store={store}>
        <SessionProvider session={session}>
          <Component.layout>
            <Notification />
            <Component {...pageProps} />
          </Component.layout>
        </SessionProvider>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Notification />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
