import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
// Import Firebase authentication and Firestore modules
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

// Registration screen component
export default function RegistrationScreen({ navigation }) {
    // State variables for form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to navigate to the login screen
    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };
  
    // Function to handle user registration
    const onRegisterPress = () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }
        // Get authentication and Firestore instances
        const auth = getAuth();
        const db = getFirestore();
    
        // Create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Extract user object from userCredential
                const user = userCredential.user;
                const uid = user.uid;
    
                // Prepare user data
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                // Reference to the user document in Firestore
                const usersRef = doc(db, "users", uid);
                // Set user data in Firestore
                setDoc(usersRef, data)
                    .then(() => {
                        // Navigate to home screen with user data
                        navigation.navigate('Home', { user: data });
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
                {/* Full name input field */}
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
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
                {/* Confirm password input field */}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Register button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                {/* Footer link to navigate to the login screen */}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}



// Namespace SDK
// const onRegisterPress = () => {
    //         if (password !== confirmPassword) {
    //             alert("Passwords don't match.")
    //             return
    //         }
    //         const auth = getAuth();
    //         const db = getFirestore();
    //         createUserWithEmailAndPassword(auth, email, password)
    //             .then((response) => {
    //                 const uid = response.user.uid
    //                 const data = {
    //                     id: uid,
    //                     email,
    //                     fullName,
    //                 };
    //                 const usersRef = addDoc(collection(db, "users"))
    //                 // usersRef
    //                 //     .doc(uid)
    //                 //     .set(data)
    //                     .then(() => {
    //                         navigation.navigate('Home', {user: data})
    //                     })
    //                     .catch((error) => {
    //                         alert(error)
    //                     });
    //             })
    //             .catch((error) => {
    //                 alert(error)
    //         });
    // }