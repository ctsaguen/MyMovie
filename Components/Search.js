// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Image, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

const { width: WIDTH } = Dimensions.get('window')
class Search extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            headerRight: () => (<View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../Image/icons8-search.png')}
                    style={styles.ImageStyle}
                />
                <TextInput
                    style={styles.search}
                    clearButtonMode='while-editing'
                    placeholder='Recherche'
                    placeholderTextColor='#ffff'
                    onChangeText={(text) => params._searchTextInputChanged(text)}
                    onSubmitEditing={() => params._loadFilms()}
                />
            </View>)

        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            _searchTextInputChanged: this._searchTextInputChanged,
            _loadFilms: this._loadFilms
        })
    }

    constructor(props) {
        super(props)
        this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
        this.state = {
            films: [],
            isLoading: false
        }
        this._searchTextInputChanged = this._searchTextInputChanged.bind(this)
        this._loadFilms = this._loadFilms.bind(this)
    }

    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({
                    films: data.results,
                    isLoading: false
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (

                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    _displayDetailForFilm = (film) => {
        this.props.navigation.navigate("FilmDetails", { film })
    }

    render() {

        return (
            <ImageBackground source={require('../Image/back.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.main_container}>
                    <FilmList
                        films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                        navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    />
                    {this._displayLoading()}
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    search: {
        width: WIDTH - 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0, 0.37)',
        borderRadius: 12,
        fontSize: 18,
        color: 'rgba(255,255,255, 1)',
        marginRight: 20,
        paddingLeft: 33
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageStyle: {
        position: "absolute",
        top: 0,
        left: 5,
        zIndex : 100,
        marginVertical: 8,
        marginRight: -10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})

export default Search