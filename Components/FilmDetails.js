import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, ImageBackground, Animated} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FadeIn from '../Animation/FadeIn'
import EnlargeShrink from '../Animation/EnlargeShrink'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: false,
      scrollOffset: new Animated.Value(0)
    }

    this._toggleFavorite = this._toggleFavorite.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      film: this.state.film
    })
  }

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.film.id)
    if (favoriteFilmIndex !== -1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, () => { this._updateNavigationParams() })
      return
    }
    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.state.params.film.id).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.props.navigation.state.params.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var shouldEnlarge
    var sourceImage
    if (this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.film.id) !== -1) {
      // Film dans nos favoris
      shouldEnlarge = true
      sourceImage = require('../Image/ic_favorite.png')
    }
    else {
      shouldEnlarge = false
      sourceImage = require('../Image/ic_favorite_border.png')
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
    const { scrollOffset } = this.state;
    const scrollEvent = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollOffset } } }],
      { useNativeDriver: true }
    );
    const expandedHeaderHeight = 400;
    const collapsedHeaderHeight = 250;
    const scrollSpan = expandedHeaderHeight - collapsedHeaderHeight;

    return (
      <ImageBackground source={require('../Image/back.jpg')} style={{ width: '100%', height: '100%' }}>
        <Animated.ScrollView
          onScroll={scrollEvent}
          scrollEventThrottle={1}
          style={styles.main_container}>
          <FadeIn>
            <Animated.View style={{
              height: expandedHeaderHeight,
              overflow: "hidden",
              // Déplacement de l'entête dans la direction opposée au défilement
              transform: [
                {
                  translateY: Animated.subtract(
                    scrollOffset,
                    scrollOffset.interpolate({
                      inputRange: [0, scrollSpan],
                      outputRange: [0, scrollSpan],
                      extrapolate: "clamp",
                    })
                  ),
                },
              ],
              // zIndex est utilisé pour que l'entête soit toujours au dessus du contenu
              zIndex: 100,
            }}>
              <Animated.Image
                style={styles.image}
                source={{ uri: getImageFromApi(this.props.navigation.state.params.film.poster_path) }}
              />
            </Animated.View>
            <Text style={styles.title_text}>{this.props.navigation.state.params.film.title}</Text>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <Text style={styles.description}>{this.props.navigation.state.params.film.overview}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>Sortie le {this.props.navigation.state.params.film.release_date}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>Note : {this.props.navigation.state.params.film.vote_average}/10</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>Nombre de vote : {this.props.navigation.state.params.film.vote_count}</Text>
          </FadeIn>
        </Animated.ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null
  },
  image: {
    flex: 1,
    backgroundColor: 'gray'
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  description: {
    fontStyle: 'normal',
    color: '#fff',
    fontSize: 16,
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
    color: '#fff',
    textAlign: 'center'
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