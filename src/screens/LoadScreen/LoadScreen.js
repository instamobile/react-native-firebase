import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

const LoadScreen = () => {
    return (
        <View style={styles.loadingContainer}>
            <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </View>
    );
};

export default LoadScreen;
