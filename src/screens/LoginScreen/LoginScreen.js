import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    }

    const onLoginPress = async () => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            
            const userDoc = await getDoc(doc(db, 'users', uid));
            
            if (!userDoc.exists()) {
                alert("User does not exist anymore.");
                return;
            }
            const userData = userDoc.data();
            await AsyncStorage.setItem('user', JSON.stringify(userData));  // Save user data
            navigation.navigate('Home', {user: userData});
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    }

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
                    onPress={onLoginPress}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                {/* Footer link to navigate to the registration screen */}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
            <LoadingModal isVisible={isLoading} />
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