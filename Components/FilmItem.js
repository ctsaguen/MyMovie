import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FadeIn from '../Animation/FadeIn'
class FilmItem extends React.Component {
  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.props.film }
    this.props.dispatch(action)
  }
  _displayFavoriteImage() {
    var sourceImage = require('../Image/ic_favorite_border.png')
    if (this.props.isFilmFavorite) {
      // Film dans nos favoris
      sourceImage = require('../Image/ic_favorite.png')
    }
   
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }
  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <FadeIn>
        <TouchableOpacity onPress={() => displayDetailForFilm(film)} style={styles.main_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={() => this._toggleFavorite()}>
                {this._displayFavoriteImage()}
              </TouchableOpacity>
              <Text style={styles.title_text}> {film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sortie le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    borderTopLeftRadius : 20,
    borderBottomLeftRadius : 20,
    height: 200,
    flexDirection: 'row',
    backgroundColor: 'rgba(26,57,117,0.9)',
    marginBottom : 10
    
  },
  image: {
    width: 120,
    height: 200,
    borderTopLeftRadius : 20,
    borderBottomLeftRadius : 20,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fff'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#fff'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
    color : 'rgba(255,255,255,1)'
  },
  favorite_image: {
    width: 25,
    height: 25
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
export default connect(mapStateToProps, mapDispatchToProps)(FilmItem)