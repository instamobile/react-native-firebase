import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { db, auth } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import LoadingModal from '../../utils/LoadingModal';

export default function HomeScreen(props) {
    const [entityText, setEntityText] = useState('');
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const userID = props.extraData.id;
    const entityRef = collection(db, 'entities');

    useEffect(() => {
        setLoading(true); 
        const q = query(
            entityRef,
            where("authorID", "==", userID),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (querySnapshot) => {
                const newEntities = [];
                querySnapshot.forEach(doc => {
                    const entity = doc.data();
                    entity.id = doc.id;
                    newEntities.push(entity);
                });
                setEntities(newEntities);
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const onAddButtonPress = async () => {
        if (entityText && entityText.length > 0) {
            setLoading(true); 
            try {
                const data = {
                    text: entityText,
                    authorID: userID,
                    createdAt: serverTimestamp(),
                };
                await addDoc(entityRef, data);
                setEntityText('');
                Keyboard.dismiss();
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false); 
            }
        }
    }

    const onLogoutPress = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            alert(error.message);
        }
    };

    const renderEntity = ({item, index}) => (
        <View style={styles.entityContainer}>
            <Text style={styles.entityText}>
                {index + 1}. {item.text}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            {entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            <LoadingModal isVisible={loading} /> 
        </View>
    );
}
