const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item === action.value.id)
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      
      if (favoriteFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite