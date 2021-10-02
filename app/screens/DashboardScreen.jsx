import React, { Component } from 'react';
import {Text, View, Dimensions, StyleSheet, Alert, TouchableOpacity, FlatList, Linking} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const SIZE = Dimensions.get('window').width/3

const DATA = [];
for (let i = 0; i < 10; i++) {
    DATA.push(i)
}
export default class App extends Component {
    state = {
        index: 0,

    }

    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this)
    }

    _onPressCarousel = () => {
        Alert.alert('Buy Nifty', 'Oops! bought Sensex')
    }

    _onPressGrid = (id) => {
        if (id === 'f') {
            Linking.openURL('https://telegram.me/Traderstunnel')
        } else if (id === 'c') {
            const whatsappMsg = 'Hi,\nI need a premium subscription for stock trading. And will undertake terms and conditions allowed by Govt. and stock traders group';
            Linking.openURL(`whatsapp://send?phone=${919834383943}&text=${whatsappMsg}`).then(() => {
                Alert.alert('Success', 'Your Premium Subscription will commence very soon');
            });
        } else if (id === 'a') {
            this.props.navigation.navigate('Intraday Page');
        }
    }

    _renderItem({ item }) {
        return (
            <View>
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: "row",alignItems: 'flex-start',justifyContent: 'center'}} >
                        <Text style={styles.itemLabel}>{`Sensex ${item}`}</Text>
                        <TouchableOpacity onPress={this._onPressCarousel} style={styles.itemLabelButton}>
                            <Text style={styles.itemLabel}>{`Buy Item`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row",alignItems: 'center',justifyContent: 'center', padding:5}} >
                        <FlatList
                            data={[
                                {id: 'a', name: 'Sensex', value: 12.22},
                                {id: 'b', name: 'Nifty', value: 57.98},
                                {id: 'c', name: 'Hindalco', value: 98.42},
                                {id: 'd', name: 'Petroleum', value: 23.92},
                            ]}
                            renderItem={({item}) => (
                                <TouchableOpacity style={{...styles.carouselContainerButtons, padding:2, flexDirection: 'column'}}>
                                    <Text style={styles.carouselItemLabel}>{item.name}</Text>
                                    <Text style={styles.carouselItemLabel}>{item.value}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                            numColumns={4} />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    ref={(c) => this.carousel = c}
                    data={DATA}
                    renderItem={this._renderItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    containerCustomStyle={styles.carouselContainer}
                    inactiveSlideShift={0}
                    onSnapToItem={(index) => this.setState({ index })}
                    useScrollView={true}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={2000}
                    autoplayDelay={1000}
                />
                <View>
                    <Pagination
                        activeDotIndex={this.state.index}
                        dotsLength={DATA.length}
                        dotColor={'red'}
                        inactiveDotColor={'blue'}
                    />
                </View>
                <FlatList
                    data={[
                    {id: 'a', value: 'Intraday Calls', icons: <Foundation name="graph-bar" size={38} color="lightblue" style={{...styles.gridIcons, backgroundColor: 'black'}}/>},
                    {id: 'b', value: 'Delivery Calls', icons: <SimpleLineIcons name="graph" size={38} color="lightblue" style={{...styles.gridIcons, backgroundColor: 'black'}}/>},
                    {id: 'c', value: 'Join Premium', icons: <MaterialIcons name="local-fire-department" size={38} color="lightblue" style={{...styles.gridIcons, backgroundColor: 'black'}}/>},
                    {id: 'd', value: 'Global Indices', icons: <Ionicons name="earth" size={38} color="black" style={styles.gridIcons}/>},
                    {id: 'e', value: 'Market', icons: <Foundation name="graph-pie" size={38} color="lightblue" style={{...styles.gridIcons, backgroundColor: 'black'}}/>},
                    {id: 'f', value: 'Join Telegram', icons: <Fontisto name="telegram" size={40} color="black" style={styles.gridIcons}/>},
                        ]}
                    renderItem={({item}) => (
                        <TouchableOpacity style={{...styles.gridContainerButtons, padding:5}} onPress={() => this._onPressGrid(item.id)}>
                            {item.icons}
                            <Text style={styles.gridItemLabel}>{item.value}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={3} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gridContainerButtons: {
        width: SIZE,
        height: SIZE,
    },
    carouselContainerButtons: {
        width: SIZE/2,
        height: SIZE/2,
    },
    item: {
        flex: 1,
        margin: 3,
        backgroundColor: 'lightblue',
    },
    carouselContainer: {
        marginTop: 30
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        backgroundColor: 'dodgerblue',
        borderRadius:20,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    itemLabel: {
        color: 'white',
        fontSize: 20,
        padding:20,
        alignItems: 'flex-start',
    },
    gridIcons: {
        zIndex: 1,
        alignSelf: 'flex-end',
        position: 'absolute',
        borderRadius:(SIZE+SIZE)/2
    },
    gridItemLabel: {
        color: 'blue',
        fontSize: 15,
        padding:20,
        alignSelf: 'center',
        width: '100%',
        height: '80%',
        fontWeight: 'bold',
        backgroundColor: 'lightskyblue',
        alignItems: 'center',
        borderRadius: 20
    },
    carouselItemLabel: {
        color: 'blue',
        fontSize: 12,
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
        alignContent: 'center',
        backgroundColor: 'lightskyblue',
        padding: 5,
        alignItems: 'stretch',
        borderRadius: 10
    },
    itemLabelButton: {
        color: 'white',
        fontSize: 20,
        alignItems: 'flex-end',
        backgroundColor: 'green', borderRadius: 20
    },
    itemLabelButtonBottom: {
        color: 'white',
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: "center",
        flex: 1,
        backgroundColor: 'goldenrod', borderRadius: 20
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
