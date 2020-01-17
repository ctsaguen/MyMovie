import React from 'react'
import { StyleSheet, ImageBackground} from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import { getFilmDetailFromApi } from '../API/TMDBApi'

class Favorites extends React.Component {

    _displayDetailForFilm = (film) => {
        this.props.navigation.navigate("FilmDetails", { film })
    }

    render() {
        return (
            <ImageBackground source={require('../Image/back.jpg')} style={{ width: '100%', height: '100%' }}>
                <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                    favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
                />
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites)