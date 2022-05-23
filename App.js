import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './screens/Auth';
import AppNavigation from './screens/AppNavigation';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { store } from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {session && session.user ? <AppNavigation key={session.user.id} session={session} /> : <Auth />}
      </View>
      <StatusBar style="light"/>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222'
  }
});

export default App;