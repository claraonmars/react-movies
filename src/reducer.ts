import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_LOADING':
        return {...state, isLoading: action.payload};
      case 'SET_MOVIES':
        return {...state, movies: action.payload};
      case 'SET_FILTERS':
        return {...state, filtersApplied: action.payload};
      default:
        return state
    }
  }