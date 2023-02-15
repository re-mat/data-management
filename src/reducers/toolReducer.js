export const toolDefaultState = {
  environmentConditions: [],
  furnaces: [],
  preparationSteps: [],
  properties: [],
  recipes: [],
  substrates: [],
  authors: [],
  catalyst: [],
  carbonSource: [],
  filters: [],
  savedFilters: [],
  queryResults: [],
}

const toolReducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const data = action.payload
      return {
        ...state,
        environmentConditions: data.environment_conditions,
        furnaces: data.furnaces,
        preparationSteps: data.preparations_steps,
        properties: data.properties,
        recipes: data.recipes,
        substrates: data.substrates,
        authors: data.authors,
        catalysts: data.catalyst,
        carbonSource: data.carbon_source
      }
    }
    case 'ADD_FILTER' : {
      const newFilter = {...action.payload}

      return {
        ...state,
        filters: [...state.filters, newFilter]
      }
    }
    case 'REMOVE_FILTER' : {
      const delIdx = action.payload
      const newFilters = [...state.filters]
      newFilters.splice(delIdx, 1)

      return {
        ...state,
        filters: newFilters
      }
    }
    case 'SET_QUERY_RESULT' : {
      return {
        ...state,
        queryResults: [...action.payload]
      }
    }
    case'SAVE_FILTERS': {
      return {
        ...state,
        savedFilters: [...state.filters]
      }
    }

    default: {
      throw new Error('No matching action type.')
    }
  }
}

export default toolReducer
