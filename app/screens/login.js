import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const auth = FIREBASE_AUTH;

  const handleSignIn = async () => {
    setLoading(true);
    setMessage(null); // Clear previous messages
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setMessage(`Welcome back, ${userCredential.user.email}!`);
      navigation.navigate('Home');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setMessage(null); // Clear previous messages
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage(`User created successfully! Welcome, ${userCredential.user.email}!`);
      navigation.navigate('Home');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In / Sign Up</Text>

      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Sign In" style={styles.buttons} onPress={handleSignIn} />
          <View style={{ height: 10 }} />
          <Button title="Sign Up" style={styles.buttons} onPress={handleSignUp} />
          <View style={{ height: 10 }} />
        </>
      )}

      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttons:{
    color:'#ccc',
    height:190,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
});
