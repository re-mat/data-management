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
	case "INIT": {
		const data = action.payload
		console.log(data.authors)
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
	default: {
		throw new Error("No matching action type.")
	}
	}
}

export default toolReducer
