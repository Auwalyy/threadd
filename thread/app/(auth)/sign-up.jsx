import * as React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSignUp, useOAuth, Clerk } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Email/password sign-up without verification
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const result = await signUp.create({ emailAddress, password });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/home'); // Change this if your home route is different
      } else {
        console.warn('Further steps required:', result);
      }
    } catch (err) {
      Alert.alert('Sign-up error', err.errors?.[0]?.message || 'Something went wrong.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up
  const onGoogleSignUpPress = async () => {
    setLoading(true);
    try {
      const { createdSessionId } = await startOAuthFlow();
      if (createdSessionId) {
        await Clerk.setActive({ session: createdSessionId });
        router.replace('/home');
      }
    } catch (err) {
      console.error('Google OAuth error:', err);
      Alert.alert('Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign Up</Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={setEmailAddress}
        style={{ marginBottom: 12, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 12, borderWidth: 1, padding: 10 }}
      />

      <TouchableOpacity
        onPress={onSignUpPress}
        style={{ backgroundColor: '#000', padding: 12, marginBottom: 12 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          {loading ? 'Signing up...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      {/* Google Sign-Up */}
      <TouchableOpacity
        onPress={onGoogleSignUpPress}
        style={{ backgroundColor: '#4285F4', padding: 12 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <Text>Already have an account? </Text>
        <Link href="/sign-in">
          <Text style={{ color: 'blue' }}>Sign in</Text>
        </Link>
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
    </View>
  );
}
