import React, { Component } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    FlatList,
    Keyboard,
    Image,
    Dimensions,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native";
import { Container, Icon, Header, Item, Input, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Spinner } from 'native-base';
import Category from './components/Explore/Category'
import Home from './components/Explore/Home'

const { height, width } = Dimensions.get('window')

class Explore extends Component {

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 80 + StatusBar.currentHeight
        }
    }

    constructor(props) {
        super(props);
        this.books = [],
        this.state = {
            bookTitle: '',
            isLoading: false,
            isResult: false,
            errorMessage: '',
            data: []
        };
    }

    SearchBook() {
        Keyboard.dismiss();
        this.setState({ isLoading: true })
        this.setState({ isResult: true })
        const bookTitle = this.state.bookTitle;
        for (var i=0; i<bookTitle.length; i++) {
          if (bookTitle[i] == ' ') {
            bookTitle[i] = '+';
          }
        }
        if (bookTitle.length != 0) {
          fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookTitle)
          .then((response) => response.json())
          .then((responseData) => {
              if (responseData.items) {
                this.books = responseData.items;
                this.setState({ isLoading: false });
              } else {
                  this.setState({ errorMessage: 'No results found', isLoading: false });
              }
          })
          .catch(error =>
              this.setState({
                  isLoading: false,
                  errorMessage: error 
              }))
          .done();
        }
        else {
          alert('Tulis Sesuatu! Misalnya : Data Minig');
        }
    }

    _onPressButton(id) {
        Linking.openURL(id);
        //Alert.alert(id);
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                            <View style={{
                                flexDirection: 'row', padding: 2,
                                backgroundColor: 'white', marginHorizontal: 20,
                                shadowOffset: { width: 0, height: 0 },
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                elevation: 1,
                                marginTop: Platform.OS == 'android' ? 30 : null
                            }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholder="Cari Buku.."
                                    placeholderTextColor="grey"
                                    style={{ flex: 1, fontWeight: '500', backgroundColor: 'white' }}
                                    onChangeText={ (bookTitle) => this.setState({bookTitle})}
                                />
                                <Icon name="ios-search" size={10} style={{ marginRight: 10, marginTop: 7 }} onPress={() => this.SearchBook()} />
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <Spinner color='red' />
                        </View>
                    </View>
                </SafeAreaView>

            );
        }
        else{
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                            <View style={{
                                flexDirection: 'row', padding: 2,
                                backgroundColor: 'white', marginHorizontal: 20,
                                shadowOffset: { width: 0, height: 0 },
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                elevation: 1,
                                marginTop: Platform.OS == 'android' ? 30 : null
                            }}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholder="Cari Buku.."
                                    placeholderTextColor="grey"
                                    style={{ flex: 1, fontWeight: '500', backgroundColor: 'white' }}
                                    onChangeText={ (bookTitle) => this.setState({bookTitle})}
                                />
                                <Icon name="ios-search" size={10} style={{ marginRight: 10, marginTop: 7 }} onPress={() => this.SearchBook()} />
                            </View>
                        </View>
                        {this.state.isResult ? (
                            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                                <ScrollView>
                                    <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginBottom: 15 }}>
                                        Hasil Pencarian :
                                    </Text>
                                    <FlatList
                                      keyExtractor={this.keyExtractor}
                                      data={this.books}
                                      renderItem = {({ item }) => 
                                          <List>
                                            <ListItem thumbnail>
                                              <Left>
                                                <Thumbnail style={{height: 80}} square source={{ uri: `${item.volumeInfo.imageLinks.thumbnail}` }} />
                                              </Left>
                                              <Body>
                                                <Text note numberOfLines={1} style={{fontWeight: "bold"}}>{item.volumeInfo.title}</Text>
                                                <Text style={{ fontSize: 10, color: '#b63838' }} note numberOfLines={1}>{item.volumeInfo.authors}</Text>
                                                <Text note numberOfLines={3}>{item.volumeInfo.description}</Text>
                                              </Body>
                                              <Right>
                                                <Button style={{backgroundColor: 'red'}} id={item.volumeInfo.previewLink} onPress={() => this._onPressButton(item.volumeInfo.previewLink)} >
                                                <Text>Baca</Text>
                                                </Button>
                                              </Right>
                                            </ListItem>
                                          </List>
                                    }/>
                                </ScrollView>
                            </View>
                        ) : (
                            <ScrollView
                                scrollEventThrottle={16}
                            >
                                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                                    <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                        Jenis buku apa yang kamu suka?
                                    </Text>

                                    <View style={{ height: 130, marginTop: 20 }}>
                                        <ScrollView
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            <Category imageUri={require('../assets/business.jpg')}
                                                name="Bisnis & Investasi"
                                            />
                                            <Category imageUri={require('../assets/tech.jpg')}
                                                name="Komputer & Teknologi"
                                            />
                                            <Category imageUri={require('../assets/restaurant.jpg')}
                                                name="Masak, Makanan & Minuman"
                                            />
                                        </ScrollView>
                                    </View>
                                    
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                            Bisnis & Investasi
                                        </Text>
                                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                            <Home width={width}
                                                cover={require('../assets/bisnis1.jpg')}
                                                name="Panduan Memulai.."
                                                type="Cyber Jannah Studio"
                                                price={'Gratis'}
                                                rating={3}
                                            />
                                            <Home width={width}
                                                cover={require('../assets/bisnis2.jpg')}
                                                name="21 Ide Bisnis Online.."
                                                type="Cyber Jannah Studio"
                                                price={'Gratis'}
                                                rating={4}
                                            />
                                            <Home width={width}
                                                cover={require('../assets/bisnis3.jpg')}
                                                name="Peluang Usaha Online.."
                                                type="Wikan Pribadi,S.TP,M.Kom"
                                                price={38775}
                                                rating={4}
                                            />
                                            <Home width={width}
                                                cover={require('../assets/bisnis4.jpg')}
                                                name="Rahasia Sukses.."
                                                type="Musthafa.Net"
                                                price={'Gratis'}
                                                rating={4.75}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </SafeAreaView>
            );
        }
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});