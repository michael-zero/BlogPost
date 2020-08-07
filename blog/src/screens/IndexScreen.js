import React, {useContext, useEffect} from 'react';
import { View, Text, FlatList, Button , StyleSheet, TouchableOpacity} from 'react-native'
import { Feather } from '@expo/vector-icons';

// import BlogContext from '../context/BlogContext'
import {Context} from '../context/BlogContext'

const IndexScreen = ({navigation}) => {
    // const {data, addBlogPost} = useContext(Context)
    const {state,deleteBlogPost, getBlogPosts} = useContext(Context)

    useEffect(() => {
        getBlogPosts()

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts()
        })

        return () => {
            listener.remove()
        }
    }, [])

    return (
        <View>
            <FlatList
            data={state}
            keyExtractor={(blogPost) => blogPost.title}
            renderItem={({item}) => {
                return (
                   <TouchableOpacity onPress={() => navigation.navigate('Show', {id : item.id})}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <Feather name="trash"  color="black" style={styles.icon} /> 
                            </TouchableOpacity>
                            
                        </View>
                    </TouchableOpacity> 
                   
                )
            }}
            />
        </View>
    )
}

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => <TouchableOpacity onPress={() => {navigation.navigate('Create')}}>
            <Feather name="plus" size={30} color="black" />
            </TouchableOpacity>,
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 26
    }
})

export default IndexScreen;