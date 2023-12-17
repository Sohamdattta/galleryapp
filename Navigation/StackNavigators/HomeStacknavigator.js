// import React,{useState,useEffect} from 'react'
// import { View, Text,FlatList,Image,TouchableOpacity,StyleSheet } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImageDetailScreen from '../../Screen/ImageDetailsScreen';

// const Stack = createStackNavigator()

// const Home = () => {
//   const [images, setImages] = useState([]);

//   const fetchImages = async () => {
//     try {
//       console.log('Fetching images...');
//       const response = await fetch(
//         'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch images');
//       }

//       const jsonData = await response.json();
//       console.log('API Response:', jsonData);
//       if (jsonData && jsonData.photos && jsonData.photos.photo) {
//         // Update state with fetched data
//         setImages(jsonData.photos.photo);

//         // Cache the fetched data
//         AsyncStorage.setItem('cachedImages', JSON.stringify(jsonData.photos.photo))
//           .then(() => console.log('Data cached successfully'))
//           .catch((error) => console.error('Error caching data:', error));
//       } else {
//         console.error('Invalid API response structure:', jsonData);
//       }
//     } catch (error) {
//       console.error('Error fetching images:', error.message);
//     }
//   };
//   useEffect(() => {
//     // Check cached data when the component updates
//     const checkCachedData = async () => {
//       try {
//         const cachedImages = await AsyncStorage.getItem('cachedImages');
//         console.log('Cached Images:', cachedImages);

//         // If cached data is available, update the state
//         if (cachedImages) {
//           setImages(JSON.parse(cachedImages));
//         }
//       } catch (error) {
//         console.error('Error checking cached data:', error.message);
//       }
//     };

//     checkCachedData();
//   }, []);
//   useEffect(() => {
//     // Fetch images when the component mounts
//     fetchImages();
//   }, []);

 

//   return (
//     // <View style={{ flex: 1 }}>
     
//     //   <FlatList
//     //     data={images}
//     //     keyExtractor={(item) => item.id.toString()}
//     //     numColumns={3}
//     //     renderItem={({ item }) => {
          
//     //       console.log('Image URL:', item.url_s);
//     //       return (
            
//     //         item.url_s ? (
//     //           <Image
//     //             source={{ uri: item.url_s }}
//     //             style={{ width: 100, height: 100 }}
//     //             onError={(error) => console.error('Image loading error:', error)}
//     //             onLoad={() => console.log('Image loaded successfully')}
//     //           />
//     //         ) : (
//     //           <Text>Error: Image URL not found</Text>
//     //         )
//     //       );
          
//     //     }}

//     //   />
//     // </View>
//     <View style={{ flex: 1 }}>
//     <FlatList
//       data={images}
//       keyExtractor={(item) => item.id.toString()}
//       numColumns={3}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ImageDetail', { imageUrl: item.url_s })}
//           style={styles.imageContainer}
//         >
//           {item.url_s ? (
//             <Image source={{ uri: item.url_s }} style={styles.image} />
//           ) : (
//             <Text>Error: Image URL not found</Text>
//           )}
//         </TouchableOpacity>
//       )}
//     />
//   </View>
//       // <View style={{ flex: 1 }}>
//       //   <Text>Test Component</Text>
//       // </View>
    
//   );
// };
// const styles = StyleSheet.create({
//   imageContainer: {
//     flex: 1 / 3, // Divide by the number of columns (3 in this case)
//     margin: 2,
//   },
//   image: {
//     flex: 1,
//     aspectRatio: 1, // Maintain aspect ratio
//   },
// });

// const HomeStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerShown: false,
//     }}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="ImageDetail" component={ImageDetailScreen}/>
//     </Stack.Navigator>
//   )
// }

// export default HomeStackNavigator
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; // Import NetInfo for network connectivity check


const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      // Check network connectivity
      const isConnected = await NetInfo.fetch().then(state => state.isConnected);

      if (!isConnected) {
        // Load images from cached data if offline
        const cachedImages = await AsyncStorage.getItem('cachedImages');
        console.log('Cached Images:', cachedImages);

        if (cachedImages) {
          setImages(JSON.parse(cachedImages));
          return;
        }
      }

      console.log('Fetching images...');
      const response = await fetch(
        'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const jsonData = await response.json();
      console.log('API Response:', jsonData);

      // Update state with fetched data
      setImages(jsonData.photos.photo);

      // Cache the fetched data only if it has changed
      const cachedImages = await AsyncStorage.getItem('cachedImages');
      if (cachedImages !== JSON.stringify(jsonData.photos.photo)) {
        AsyncStorage.setItem('cachedImages', JSON.stringify(jsonData.photos.photo))
          .then(() => console.log('Data cached successfully'))
          .catch((error) => console.error('Error caching data:', error));
      }
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ImageDetail', { imageUrl: item.url_s })}
            style={styles.imageContainer}
          >
            {item.url_s ? (
              <Image source={{ uri: item.url_s }} style={styles.image} />
            ) : (
              <Text>Error: Image URL not found</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1 / 3,
    margin: 2,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
});

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={Home} />

    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
