import React, {useContext} from "react";
import {GlobalContext} from "../../pages/App";
import {isDefault} from "./utils";
import {Link} from "react-router-dom";

const QueryResultTableRows = () => {
  const {toolState} = useContext(GlobalContext)

  return (
    <>
      {toolState.queryResults.map(experiment => {
        const furnaceId = experiment.furnace ? experiment.furnace.id : 'N/A'
        const substrateId = experiment.substrate ? experiment.substrate.id : 'N/A'
        const numLayers = experiment.properties ? experiment.properties.number_of_layers.value : 'N/A'
        const coverage = experiment.properties ? experiment.properties.growth_coverage.value : 'N/A'
        // to display all authors
        // var res = 'N/A'
        // if(experiment.authors){
        // res = ''
        // for(var i=0; i<experiment.authors.length;i++){
        //   if(i!=0)
        //     res += ' , '
        //   res += experiment.authors[i].first_name+ ' ' + experiment.authors[i].last_name
        // } 
        // }
        // const author = res
        const author = experiment.authors.length > 0 ? experiment.authors[0].first_name + ' ' + experiment.authors[0].last_name : 'N/A'
        const carbonSource = experiment.recipe ? experiment.recipe.carbon_source.value : 'N/A'
        return (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 px-6 text-sm font-medium text-blue-700 underline whitespace-nowrap dark:text-white">
              <Link to={`/tool/experiments/${experiment.id}`}>
                {experiment.id}
              </Link>
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {furnaceId}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {substrateId}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {numLayers}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {coverage}
            </td>
            {/* <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              ????
            </td> */}
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {author}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {carbonSource}
            </td>
            {/* COLUMNS FOR ADDITIONAL FILTERS */}
            {toolState.savedFilters
              .filter(filter => !isDefault(filter))
              .map((filter, i) => {
                console.log(filter)
                  if (!filter || !filter.name) {
                    return null
                  }
                  const filterName = filter.name.toLowerCase()
                  let value = null
                  if (filterName.includes('dew point'))
                    value = experiment.environment_conditions ? experiment.environment_conditions.dew_point.value : 'N/A'
                  else if (filterName.includes('ambient temperature'))
                    value = experiment.environment_conditions ? experiment.environment_conditions.ambient_temperature.value : 'N/A'
                  else if (filterName.includes('tube diameter'))
                    value = experiment.furnace ? experiment.furnace.tube_diameter.value : 'N/A'
                  else if (filterName.includes('cross sectional area'))
                    value = experiment.furnace ? experiment.furnace.cross_sectional_area.value : 'N/A'
                  else if (filterName.includes('tube length'))
                    value = experiment.furnace ? experiment.furnace.tube_length.value : 'N/A'
                  else if (filterName.includes('length of heated region'))
                    value = experiment.furnace ? experiment.furnace.length_of_heated_region.value : 'N/A'
                  else if (filterName.includes('catalyst'))
                    value = experiment.substrate ? experiment.substrate.catalyst.value : 'N/A'
                  else if (filterName.includes('thickness'))
                    value = experiment.substrate ? experiment.substrate.thickness.value : 'N/A'
                  else if (filterName.includes('diameter'))
                    value = experiment.substrate ? experiment.substrate.diameter.value : 'N/A'
                  else if (filterName.includes('length'))
                    value = experiment.substrate ? experiment.substrate.length.value : 'N/A'
                  else if (filterName.includes('surface area'))
                    value = experiment.substrate ? experiment.substrate.surface_area.value : 'N/A'
                  else if (filterName.includes('shape'))
                    value = experiment.properties ? experiment.properties.shape.value : 'N/A'
                  else if (filterName.includes('average thickness of growth'))
                    value = experiment.properties ? experiment.properties.average_thickness_of_growth.value : 'N/A'
                  else if (filterName.includes('std. dev. of growth'))
                    value = experiment.properties ? experiment.properties.standard_deviation_of_growth.value : 'N/A'
                  else if (filterName.includes('number of layers'))
                    value = experiment.properties ? experiment.properties.number_of_layers.value : 'N/A'
                  else if (filterName.includes('growth coverage'))
                    value = experiment.properties ? experiment.properties.growth_coverage.value : 'N/A'
                  else if (filterName.includes('domain size'))
                    value = experiment.properties ? experiment.properties.domain_size.value : 'N/A'
                  else if (filterName.includes('base pressure'))
                    value = experiment.recipe ? experiment.recipe.base_pressure.value : 'N/A'
                  else if (filterName.includes('maximum temperature'))
                    value = experiment.recipe ? experiment.recipe.maximum_temperature.value : 'N/A' 
                  else if (filterName.includes('maximum pressure'))
                    value = experiment.recipe ? experiment.recipe.maximum_pressure.value : 'N/A'
                  else if (filterName.includes('max flow rate'))
                    value = experiment.recipe ? experiment.recipe.max_flow_rate.value : 'N/A'
                  else if (filterName.includes('inert gas'))
                    value = filter.value
                    // experiment.recipe ? (experiment.recipe.uses_helium? "Helium ":"") + (experiment.recipe.uses_argon? "Argon ":"") : 'N/A' 
                  else if (filterName.includes('growth duration'))
                    value = experiment.recipe ? experiment.recipe.growth_duration.value : 'N/A'
                  else if (filterName.includes('carbon source flow rate'))
                    value = experiment.recipe ? experiment.recipe.carbon_source_flow_rate.value : 'N/A'
                  return (
                    <td key={filter.name}
                        className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {value}
                    </td>
                  )
                }
              )
            }
          </tr>
        )
      })}
    </>
  )
}
export default QueryResultTableRows