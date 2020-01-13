import React from 'react'
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import numeral from 'numeral'
import FadeIn from '../Animation/FadeIn'
import EnlargeShrink from '../Animation/EnlargeShrink'

class FilmDetail extends React.Component {
  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.props.navigation.state.params.film.id }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var shouldEnlarge = false
    var sourceImage = require('../Image/15187654148852_ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item === this.props.navigation.state.params.film.id) != -1) {
      // Film dans nos favoris
      shouldEnlarge = true
      sourceImage = require('../Image/15187653912696_ic_favorite.png')
    }
    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  render() {
    return (

      <ScrollView style={styles.main_container}>
        <FadeIn>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(this.props.navigation.state.params.film.poster_path) }}
          />
          <Text style={styles.title_text}>{this.props.navigation.state.params.film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description}>{this.props.navigation.state.params.film.overview}</Text>
          <Text>Sortie le {this.props.navigation.state.params.film.release_date}</Text>
          <Text>Note : {this.props.navigation.state.params.film.vote_average}/10</Text>
          <Text>Nombre de vote : {this.props.navigation.state.params.film.vote_count}</Text>
          <Text>Budget : {numeral(this.props.navigation.state.params.film.budget).format('0,0[.]00 $')}</Text>
        </FadeIn>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null
  },
  image: {
    flex: 1,
    height: 200,
    backgroundColor: 'gray'
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  description: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)