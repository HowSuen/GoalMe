import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './screens/Auth';
import Account from './screens/Account';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { store } from './store/store';
import { Provider } from 'react-redux';

import HomePage from './screens/HomePage';

const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
        <HomePage/>
        <StatusBar style="light"/>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222'
  }
});

export default App;