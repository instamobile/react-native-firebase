import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
// Import Firebase authentication and Firestore modules
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login screen component
export default function LoginScreen({ navigation }) {
    // State variables for email and password fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to navigate to the registration screen
    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    };

    // Function to handle login button press
    const onLoginPress = () => {
        // Get authentication and Firestore instances
        const auth = getAuth();
        const db = getFirestore();

        // Sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Extract user object from userCredential
                const user = userCredential.user;
                const uid = user.uid;

                // Reference to the user document in Firestore
                const userRef = doc(db, 'users', uid);
                // Get user data from Firestore
                getDoc(userRef)
                    .then((response) => {
                        // Check if user document exists
                        if (!response.exists()) {
                            alert("User does not exist anymore.");
                            return;
                        }
                        // Extract user data from Firestore response
                        const userData = response.data();
                        // Navigate to home screen
                        navigation.navigate('Home');
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                {/* App logo */}
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                {/* Email input field */}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Password input field */}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Login button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                {/* Footer link to navigate to the registration screen */}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

// Namespace SDK
// const onLoginPress = () => {
//     firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password)
//         .then((response) => {
//             const uid = response.user.uid
//             const usersRef = firebase.firestore().collection('users')
//             usersRef
//                 .doc(uid)
//                 .get()
//                 .then(firestoreDocument => {
//                     if (!firestoreDocument.exists) {
//                         alert("User does not exist anymore.")
//                         return;
//                     }
//                     const user = firestoreDocument.data()
//                     navigation.navigate('Home', {user})
//                 })
//                 .catch(error => {
//                     alert(error)
//                 });
//         })
//         .catch(error => {
//             alert(error)
//         })
// }