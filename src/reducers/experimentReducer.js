export const experimentDefaultState = {
  experiment: null,
  recipeGraphData: null,
  ramanFiles: null,
  semFileUrls: []
}

const experimentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPERIMENT': {
      return {
        ...state,
        experiment: action.payload.experiment,
        ramanFiles: action.payload.raman_files,
        semFileUrls: action.payload.sem_file_urls,
      }
    }
    case 'INIT_GRAPH_DATA': {
      const recipe = state.experiment.recipe
      if (!recipe) {
        return state
      }
      const graphData = {
        argonFlowRates: [],
        carbonSourceFlowRates: [],
        // coolingRates: [],
        durations: [],
        furnacePressures: [],
        furnaceTemperatures: [],
        heliumFlowRates: [],
        hydrogenFlowRates: [],
        // sampleLocations: [],
      }
      let elapsedTime = 0
      let growingEndTime = 0
      let annealingEndTime = 0
      let coolingEndTime = 0
      const times = []
      let currStep = 'Annealing'

      if (recipe.preparation_steps) {
        // initializing values at time=0
        times.push(0)
        const prepStep = recipe.preparation_steps[0]
        graphData.argonFlowRates.push(prepStep.argon_flow_rate.value ? prepStep.argon_flow_rate.value : 0)
        graphData.carbonSourceFlowRates.push(prepStep.carbon_source_flow_rate.value ? prepStep.carbon_source_flow_rate.value : 0)
        graphData.furnacePressures.push(prepStep.furnace_pressure.value ? prepStep.furnace_pressure.value : (recipe.base_pressure.value?recipe.base_pressure.value:760))
        graphData.furnaceTemperatures.push(25) //room_temperature
        graphData.heliumFlowRates.push(prepStep.helium_flow_rate.value ? prepStep.helium_flow_rate.value : 0)
        graphData.hydrogenFlowRates.push(prepStep.hydrogen_flow_rate.value ? prepStep.hydrogen_flow_rate.value : 0)

        for (const prepStep of recipe.preparation_steps) {
          const argonFlowRate = prepStep.argon_flow_rate.value ? prepStep.argon_flow_rate.value : 0
          const carbonSourceFlowRate = prepStep.carbon_source_flow_rate.value ? prepStep.carbon_source_flow_rate.value : 0
          // const coolingRate = prepStep.cooling_rate.value ? prepStep.cooling_rate.value : 0
          const duration = prepStep.duration.value ? prepStep.duration.value : 0
          const furnacePressure = prepStep.furnace_pressure.value ? prepStep.furnace_pressure.value : 0
          const furnaceTemperature = prepStep.furnace_temperature.value ? prepStep.furnace_temperature.value : 0
          const heliumFlowRate = prepStep.helium_flow_rate.value ? prepStep.helium_flow_rate.value : 0
          const hydrogenFlowRate = prepStep.hydrogen_flow_rate.value ? prepStep.hydrogen_flow_rate.value : 0
          // const sampleLocation = prepStep.sample_location.value ? prepStep.sample_location.value : 0
          if (currStep !== prepStep.name.value) {
            if (currStep === 'Annealing') {
              annealingEndTime = elapsedTime
              currStep = 'Growing'
            } else if (currStep === 'Growing') {
              growingEndTime = elapsedTime
            }
          }
          elapsedTime += duration
          times.push(elapsedTime)
          graphData.argonFlowRates.push(argonFlowRate)
          graphData.carbonSourceFlowRates.push(carbonSourceFlowRate)
          // graphData.coolingRates.push(coolingRate)
          graphData.furnacePressures.push(furnacePressure)
          graphData.furnaceTemperatures.push(furnaceTemperature)
          graphData.heliumFlowRates.push(heliumFlowRate)
          graphData.hydrogenFlowRates.push(hydrogenFlowRate)
          // graphData.sampleLocations.push(sampleLocation)
        }
      }
      coolingEndTime = elapsedTime
      return {
        ...state,
        recipeGraphData: {
          growingEndTime,
          annealingEndTime,
          coolingEndTime,
          data: {
            labels: times,
            datasets: [
              {
                label: 'Argon Flow Rate (sccm)',
                data: graphData.argonFlowRates,
                backgroundColor: 'rgb(244, 67, 54)',
                borderColor: 'rgb(244, 67, 54)',
                hidden: true,
              }, {
                label: `${recipe.carbon_source.value} Flow Rate (sccm)`,
                data: graphData.carbonSourceFlowRates,
                backgroundColor: 'rgb(244, 143, 177)',
                borderColor: 'rgb(244, 143, 177)',
                hidden: true,
              }, {
                label: 'Furnace Pressure (Torr)',
                data: graphData.furnacePressures,
                backgroundColor: 'rgb(171, 71, 188)',
                borderColor: 'rgb(171, 71, 188)',
                hidden: true,
              }, {
              //   label: 'Cooling Rate (°C/min)',
              //   data: graphData.coolingRates,
              //   backgroundColor: 'rgb(49, 27, 146)',
              //   borderColor: 'rgb(49, 27, 146)',
              //   hidden: true,
              // }, {
                label: 'Furnace Temperature (°C)',
                data: graphData.furnaceTemperatures,
                backgroundColor: 'rgb(121, 134, 203)',
                borderColor: 'rgb(121, 134, 203)',
              }, {
                label: 'Helium Flow Rate (sccm)',
                data: graphData.heliumFlowRates,
                backgroundColor: 'rgb(13, 71, 161)',
                borderColor: 'rgb(13, 71, 161)',
                hidden: true,
              }, {
                label: 'Hydrogen Flow Rate (sccm)',
                data: graphData.hydrogenFlowRates,
                backgroundColor: 'rgb(0, 176, 255)',
                borderColor: 'rgb(0, 176, 255)',
                hidden: true,
              }
              // }, {
              //   label: 'Sample Location (mm)',
              //   data: graphData.sampleLocations,
              //   backgroundColor: 'rgb(0, 131, 143)',
              //   borderColor: 'rgb(0, 131, 143)',
              //   hidden: true,
              // }
            ]
          }
        }
      }
    }
    default: {
      throw new Error('No matching action type.')
    }
  }
}

export default experimentReducer
