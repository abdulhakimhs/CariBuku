import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const { height, width } = Dimensions.get('window')

export default class Profile extends Component {

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 80 + StatusBar.currentHeight
        }
    }

  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    <View style={{
                        flexDirection: 'row', padding: 2,
                        backgroundColor: 'white', marginHorizontal: 20,
                        marginTop: Platform.OS == 'android' ? 30 : null
                    }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>Anggota Tim</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                    <List>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail source={{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-0/c0.0.370.370a/p370x247/14633089_115901228878168_4822577903377359298_n.jpg?_nc_cat=101&_nc_oc=AQneaAHa7R6Orx2RMXrndC8hyKUQQaqPovHyYaVmAcCmUdPgNeuzKUwo_FBj6d9aXJE&_nc_ht=scontent-sin6-2.xx&oh=1d7c162ca0df7acacee17827fb0a0d4b&oe=5DB3B2CA' }} />
                          </Left>
                          <Body>
                            <Text>Dwi Mettius Puji Handika</Text>
                            <Text note>STMIK WP PEKALONGAN</Text>
                          </Body>
                          <Right>
                            <Text note>16.240.0190</Text>
                          </Right>
                        </ListItem>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail source={{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-1/p160x160/14581554_122062524924981_7277426063011502695_n.jpg?_nc_cat=110&_nc_oc=AQnvcrhYLmAwfvduf_nAU6P2GNmJN6v1xVJr0JgedPQEAY01t1pKCRxFtgptQim9j0E&_nc_ht=scontent-sin6-2.xx&oh=a5ca4f6c9c79b7fbced6a36ecc9ff9cf&oe=5DAFC758' }} />
                          </Left>
                          <Body>
                            <Text>Abdul Hakim Hassan</Text>
                            <Text note>STMIK WP PEKALONGAN</Text>
                          </Body>
                          <Right>
                            <Text note>16.240.0015</Text>
                          </Right>
                        </ListItem>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail source={{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-1/p160x160/35886931_2130382897173175_4659758698313285632_n.jpg?_nc_cat=101&_nc_oc=AQlFbM5peKrlbjHy9fkd9DP6biQnIdXzbbm6L1ztvDJi6UCyQJYlO0Hl6MxRectztCc&_nc_ht=scontent-sin6-2.xx&oh=73703d829bf3d5a131b87e9af413bdd8&oe=5DA0F10A' }} />
                          </Left>
                          <Body>
                            <Text>Nuril Muslichin</Text>
                            <Text note>STMIK WP PEKALONGAN</Text>
                          </Body>
                          <Right>
                            <Text note>16.240.0027</Text>
                          </Right>
                        </ListItem>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail source={{ uri: 'https://u.ph.edim.co/856c/125179117_3_140.png' }} />
                          </Left>
                          <Body>
                            <Text>M. Ichwanul Muflichin</Text>
                            <Text note>STMIK WP PEKALONGAN</Text>
                          </Body>
                          <Right>
                            <Text note>16.240.0106</Text>
                          </Right>
                        </ListItem>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail source={{ uri: 'https://u.ph.edim.co/a154/125179040_1_140.jpg' }} />
                          </Left>
                          <Body>
                            <Text>Rudi Hermawan</Text>
                            <Text note>STMIK WP PEKALONGAN</Text>
                          </Body>
                          <Right>
                            <Text note>16.240.0190</Text>
                          </Right>
                        </ListItem>
                    </List>
                </View>
            </View>
        </SafeAreaView>
    );
  }
}