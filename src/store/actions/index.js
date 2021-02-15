export const SEARCH_ONCHANGE = 'SEARCH_ONCHANGE'
export const CHANGE_DATA = 'CHANGE_DATA'
export const CHANGE_URL = 'CHANGE_URL'
export const LOADER_SWITCHER = 'LOADER_SWITCHER'
export const ERROR_SWITCHER = 'ERROR_SWITCHER'
export const SEARCH_RESET = 'SEARCH_RESET'

export function searchOnChange(value) {
  return {
    type: SEARCH_ONCHANGE,
    payload: value,
  }
}

export function resetSearch() {
  return {
    type: SEARCH_RESET,
  }
}

export function changeURL(newURL) {
  return {
    type: CHANGE_URL,
    payload: newURL,
  }
}

export function loaderSwitcher(loaderState) {
  return {
    type: LOADER_SWITCHER,
    payload: loaderState,
  }
}

export function errorSwitcher(errorState) {
  return {
    type: ERROR_SWITCHER,
    payload: errorState,
  }
}

export function changeData(url) {
  return async function (dispatch) {
    dispatch(loaderSwitcher(true))
    try {
      const res = await (
        await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '923777365emshee1435367f16eebp10b70bjsnc6ef88acec9a',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          },
        })
      ).json()
      if (res.cod !== '200') {
        throw new Error(res.message)
      }
      dispatch({ type: CHANGE_DATA, payload: res })
    } catch (error) {
      dispatch(errorSwitcher(error.message))
    }
    dispatch(loaderSwitcher(false))
  }
}
