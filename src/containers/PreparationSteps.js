import React from 'react'
import PreparationStep from '../components/PreparationStep'

const PreparationSteps = ({preparationSteps}) => {
  if (!preparationSteps) {
    return null
  }
  return (
    preparationSteps.map((preparationStep) =>
      <PreparationStep
        key={preparationStep.id}
        id={preparationStep.id}
        step={preparationStep.step.value}
        name={preparationStep.name.value}
        duration={preparationStep.duration.value}
        furnaceTemperature={preparationStep.furnace_temperature.value}
        furnacePressure={preparationStep.furnace_pressure.value}
        sampleLocation={preparationStep.sample_location.value}
        heliumFlowRate={preparationStep.helium_flow_rate.value}
        hydrogenFlowRate={preparationStep.hydrogen_flow_rate.value}
        carbonSourceFlowRate={preparationStep.carbon_source_flow_rate.value}
        argonFlowRate={preparationStep.argon_flow_rate.value}
        coolingRate={preparationStep.cooling_rate.value}
      />
    )
  )
}

export default PreparationSteps
