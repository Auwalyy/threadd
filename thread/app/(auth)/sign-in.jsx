import React from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/home'); // or '/' if you fixed your home route
      } else {
        console.error('Further steps required:', signInAttempt);
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors?.[0]?.message || 'Sign-in failed');
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Sign in</Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />

      <TouchableOpacity onPress={onSignInPress} style={{ backgroundColor: '#000', padding: 12 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Continue</Text>
      </TouchableOpacity>

      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <Text>Don't have an account? </Text>
        <Link href="/auth/sign-up">
          <Text style={{ color: 'blue' }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
