import React, {useContext} from "react"
import {ExperimentContext} from "../pages/ExperimentView"

const Sem = () => {
	const {semFileUrls} = useContext(ExperimentContext)

	if (!semFileUrls || semFileUrls.length === 0) {
		return <p className='text-center'>No result</p>
	}
	return (
		<>
			{semFileUrls.map((semFileUrl, i) => {
				return <img
					src={semFileUrl}
					alt={`Sem file ${i + 1}`}
					className='w-96 h-96'
					key={i}/>
			})}
		</>
	)
}

export default Sem
