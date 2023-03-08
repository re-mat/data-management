import {carbonSourceOptions, catalystOptions, prepNameOptions, shapeOptions, materialNameOptions} from "../settings"

export const submissionDefaultState = {
	materialName: materialNameOptions[0],
	useCustomEnvironmentConditions: false,
	environmentConditionsNumber: 1,
	ambientTemperature: 0,
	dewPoint: 0,
	useCustomFurnace: false,
	furnaceNumber: 1,
	tubeDiameter: 0,
	crossSectionalArea: 0,
	tubeLength: 0,
	lengthOfHeatedRegion: 0,
	useCustomSubstrate: false,
	substrateNumber: 1,
	catalyst: catalystOptions[0],
	thickness: 0,
	diameter: 0,
	length: 0,
	surfaceArea: 0,
	useCustomRecipe: false,
	recipeNumber: 1,
	carbonSource: carbonSourceOptions[0],
	basePressure: 0,
	preparationSteps: [],
	name: prepNameOptions[0],
	duration: 0,
	furnaceTemperature: 0,
	furnacePressure: 0,
	sampleLocation: 0,
	heliumFlowRate: 0,
	hydrogenFlowRate: 0,
	carbonSourceFlowRate: 0,
	argonFlowRate: 0,
	coolingRate: 0,
	useCustomProperties: false,
	propertiesNumber: 1,
	avgThicknessOfGrowth: 0,
	stdDevOfGrowth: 0,
	numberOfLayers: 0,
	growthCoverage: 0,
	domainSize: 0,
	shape: shapeOptions[0],
	authors: [],
	semFiles: [],
	ramanFiles: [],
}

const submissionReducer = (state, action) => {
	switch (action.type) {
	case "INIT_SUBMISSION": {
		return {
			...state,
			authors: [...state.authors, action.payload]
		}
	}
	case "MATERIAL_NAME_CHANGE": {
		return {
			...state,
			materialName: action.payload
		}
	}
	case "SET_CUSTOM_ENVIRONMENT_CONDITIONS": {
		return {
			...state,
			useCustomEnvironmentConditions: action.payload
		}
	}
	case "ENVIRONMENT_CONDITIONS_NUMBER_CHANGE": {
		return {
			...state,
			environmentConditionsNumber: action.payload
		}
	}
	case "AMBIENT_TEMPERATURE_CHANGE": {
		return {
			...state,
			ambientTemperature: action.payload
		}
	}
	case "DEW_POINT_CHANGE": {
		return {
			...state,
			dewPoint: action.payload
		}
	}
	case "SET_CUSTOM_FURNACE": {
		return {
			...state,
			useCustomFurnace: action.payload
		}
	}
	case "FURNACE_NUMBER_CHANGE": {
		return {
			...state,
			furnaceNumber: action.payload
		}
	}
	case "TUBE_DIAMETER_CHANGE": {
		return {
			...state,
			tubeDiameter: action.payload
		}
	}
	case "CROSS_SECTIONAL_AREA_CHANGE": {
		return {
			...state,
			crossSectionalArea: action.payload
		}
	}
	case "TUBE_LENGTH_CHANGE": {
		return {
			...state,
			tubeLength: action.payload
		}
	}
	case "LENGTH_OF_HEATED_REGION_CHANGE": {
		return {
			...state,
			lengthOfHeatedRegion: action.payload
		}
	}
	case "SET_CUSTOM_SUBSTRATE": {
		return {
			...state,
			useCustomSubstrate: action.payload
		}
	}
	case "SUBSTRATE_NUMBER_CHANGE": {
		return {
			...state,
			substrateNumber: action.payload
		}
	}
	case "CATALYST_CHANGE": {
		return {
			...state,
			catalyst: action.payload
		}
	}
	case "THICKNESS_CHANGE": {
		return {
			...state,
			thickness: action.payload
		}
	}
	case "DIAMETER_CHANGE": {
		return {
			...state,
			diameter: action.payload
		}
	}
	case "LENGTH_CHANGE": {
		return {
			...state,
			length: action.payload
		}
	}
	case "SURFACE_AREA_CHANGE": {
		return {
			...state,
			surfaceArea: action.payload
		}
	}
	case "SET_CUSTOM_RECIPE": {
		return {
			...state,
			useCustomRecipe: action.payload
		}
	}
	case "RECIPE_NUMBER_CHANGE": {
		return {
			...state,
			recipeNumber: action.payload
		}
	}
	case "BASE_PRESSURE_CHANGE": {
		return {
			...state,
			basePressure: action.payload
		}
	}
	case "NAME_CHANGE": {
		return {
			...state,
			name: action.payload
		}
	}
	case "DURATION_CHANGE": {
		return {
			...state,
			duration: action.payload
		}
	}
	case "FURNACE_TEMPERATURE_CHANGE": {
		return {
			...state,
			furnaceTemperature: action.payload
		}
	}
	case "FURNACE_PRESSURE_CHANGE": {
		return {
			...state,
			furnacePressure: action.payload
		}
	}
	case "SAMPLE_LOCATION_CHANGE": {
		return {
			...state,
			sampleLocation: action.payload
		}
	}
	case "HELIUM_FLOW_RATE_CHANGE": {
		return {
			...state,
			heliumFlowRate: action.payload
		}
	}
	case "HYDROGEN_FLOW_RATE_CHANGE": {
		return {
			...state,
			hydrogenFlowRate: action.payload
		}
	}
	case "CARBON_SOURCE_FLOW_RATE_CHANGE": {
		return {
			...state,
			carbonSourceFlowRate: action.payload
		}
	}
	case "ARGON_FLOW_RATE_CHANGE": {
		return {
			...state,
			argonFlowRate: action.payload
		}
	}
	case "COOLING_RATE_CHANGE": {
		return {
			...state,
			coolingRate: action.payload
		}
	}
	case "SET_CUSTOM_PROPERTIES": {
		return {
			...state,
			useCustomProperties: action.payload
		}
	}
	case "PROPERTIES_NUMBER_CHANGE": {
		return {
			...state,
			propertiesNumber: action.payload
		}
	}
	case "AVG_THICKNESS_OF_GROWTH_CHANGE": {
		return {
			...state,
			avgThicknessOfGrowth: action.payload
		}
	}
	case "STD_DEV_OF_GROWTH_CHANGE": {
		return {
			...state,
			stdDevOfGrowth: action.payload
		}
	}
	case "NUMBER_OF_LAYERS_CHANGE": {
		return {
			...state,
			numberOfLayers: action.payload
		}
	}
	case "GROWTH_COVERAGE_CHANGE": {
		return {
			...state,
			growthCoverage: action.payload
		}
	}
	case "DOMAIN_SIZE_CHANGE": {
		return {
			...state,
			domainSize: action.payload
		}
	}
	case "SHAPE_CHANGE": {
		return {
			...state,
			shape: action.payload
		}
	}
	case "ADD_AUTHOR" : {
		return {
			...state,
			authors: [...state.authors, action.payload]
		}
	}
	case "ADD_PREPARATION_STEP" : {
		const newPrepStep = {
			name: state.name,
			duration: state.duration,
			furnaceTemperature: state.furnaceTemperature,
			furnacePressure: state.furnacePressure,
			sampleLocation: state.sampleLocation,
			heliumFlowRate: state.heliumFlowRate,
			hydrogenFlowRate: state.hydrogenFlowRate,
			carbonSourceFlowRate: state.carbonSourceFlowRate,
			argonFlowRate: state.argonFlowRate,
			coolingRate: state.coolingRate,
		}
		return {
			...state,
			preparationSteps: [...state.preparationSteps, newPrepStep]
		}
	}
	case "DEL_PREPARATION_STEP" : {
		const newPrepSteps = state.preparationSteps.filter((p, i) => {
			return i !== action.payload
		})
		return {
			...state,
			preparationSteps: newPrepSteps
		}
	}
	case "DEL_AUTHOR" : {
		const filteredAuthors = state.authors.filter((author, i) => {
			return i !== action.payload
		})
		return {
			...state,
			authors: filteredAuthors
		}
	}
	case "UPLOAD_SEM_FILES": {
		return {
			...state,
			semFiles: action.payload
		}
	}
	case "UPLOAD_RAMAN_FILES": {
		return {
			...state,
			ramanFiles: action.payload
		}
	}
	default: {
		throw new Error("No matching action type.")
	}
	}
}

export default submissionReducer
