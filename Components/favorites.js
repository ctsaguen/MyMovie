import React from 'react'
import { StyleSheet } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import { getFilmDetailFromApi } from '../API/TMDBApi'

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
    }
    _displayDetailForFilm = (film) => {
        this.props.navigation.navigate("FilmDetails", { film })
    }

    _loadFilm(id){
        getFilmDetailFromApi(id).then(data => {
            this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
              })
              console.log(this.state.films)
        })
    }

    render() {
        console.log(this.props.favoritesFilm)
        return (
            <FilmList
                films={this.state.films}
                navigation={this.props.navigation}
                favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
            />
        )
    }
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites)