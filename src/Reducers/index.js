import { combineReducers } from 'redux'
import {optionParameters, hestonParameters, bsParameters} from './optionParameters'
import {hestonValidation, optionValidation, bsValidation} from './formValidation'
import {selectedModel} from './selectedModel'
import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts
} from './data'

/**this custom combiner provides the optionParameters to each reducer */
//const customCombineReducers=obj=>(state={}, action)=>Object.keys(obj).reduce((aggr, curr)=>({...aggr, [curr]:obj[curr](state[curr], action, state)}), {})

/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default combineReducers({
    optionParameters,
    hestonParameters,
    hestonValidation,
    bsParameters,
    bsValidation,
    selectedModel,
    optionValidation,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts
})