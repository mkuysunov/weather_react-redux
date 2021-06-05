import { UPDATE_DATA, LOADER_SWITCHER, SEARCH_ONCHANGE, ERROR_SWITCHER, SEARCH_RESET } from '../actions'

const initialDate = {
  search: '',
  url: 'https://community-open-weather-map.p.rapidapi.com/forecast?q=dushanbe',
  list: [],
  city: null,
  isLoading: false,
  isError: false,
}

export function reducer(state = initialDate, action) {
  switch (action.type) {
    case SEARCH_ONCHANGE:
      return { ...state, search: action.payload }
    case SEARCH_RESET:
      return { ...state, search: '' }
    case UPDATE_DATA:
      return { ...state, ...action.payload }
    case LOADER_SWITCHER:
      return { ...state, isLoading: action.payload }
    case ERROR_SWITCHER:
      return { ...state, isError: action.payload }
    default:
      return state
  }
}
