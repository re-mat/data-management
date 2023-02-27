import React, {useContext} from "react";
import {Scatter} from 'react-chartjs-2';
import {ExperimentContext} from "../pages/ExperimentView";
import {getRandomInt} from "../utils/math";

const Raman = () => {
  const {ramanFiles} = useContext(ExperimentContext)
  if (!ramanFiles || ramanFiles.length === 0) {
    return <p className='text-center'>No result</p>
  }

  const data = {
    datasets: []
  }

  ramanFiles.forEach((ramanFile, i) => {
    const ramanData = {
      label: `Raman data ${i + 1}`,
      data: ramanFile.data,
      backgroundColor: `rgba(${getRandomInt(0, 256)}, ${getRandomInt(0, 256)}, ${getRandomInt(0, 256)}, 1)`,
    }
    data.datasets.push(ramanData)
  })

  return (
    <Scatter
      options={{}}
      data={data}
    />
  )
}

export default Raman