export const SEARCH_ONCHANGE = 'SEARCH_ONCHANGE'
export const UPDATE_DATA = 'UPDATE_DATA'
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
    payload: {},
  }
}

export function updateData(data) {
  return {
    type: UPDATE_DATA,
    payload: { ...data },
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

export function loadData(searchText) {
  return async function (dispatch) {
    // validation
    if (!searchText) {
      return
    }

    const url = new URL('https://community-open-weather-map.p.rapidapi.com/forecast')
    url.searchParams.set('q', searchText)

    dispatch(loaderSwitcher(true))
    try {
      const res = await (
        await fetch(url.href, {
          headers: {
            'x-rapidapi-key': '923777365emshee1435367f16eebp10b70bjsnc6ef88acec9a',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          },
        })
      ).json()

      if (res.cod !== '200') {
        throw new Error(res.message)
      }
      const { list, city } = res
      dispatch(updateData({ list, city }))
      dispatch(resetSearch())
    } catch (error) {
      dispatch(errorSwitcher(error.message))
    }
    dispatch(loaderSwitcher(false))
  }
}
