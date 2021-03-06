import { modelMap } from '../modelSkeleton'
import { 
    UPDATE_QUANTILE, 
    UPDATE_SLIDER_RANGE, 
    UPDATE_OPTION_FORM, 
    UPDATE_OPTION_VALIDATION,
    createValidationType, 
    createOptionType
} from './actionDefinitions'

const generateValidation=paramName=>(key, value, dispatch)=>{
    dispatch({
        type:createValidationType(paramName),
        key,
        value
    })
}
const generateOptions=paramName=>(key, value, validation, dispatch)=>{
    dispatch({
        type:createOptionType(paramName),
        key,
        value
    })
    generateValidation(paramName)(key, validation, dispatch)
}

const updateSlider=(key, value, dispatch)=>{
    dispatch({
        type:UPDATE_SLIDER_RANGE,
        key, 
        value
    })
}

const updateOptionForm=(key, value, validation, dispatch)=>{
    dispatch({
        type:UPDATE_OPTION_FORM,
        key, value
    })
    dispatch({
        type:UPDATE_OPTION_VALIDATION,
        key, value:validation
    })
}


const updateQuantile=(value, dispatch)=>{
    dispatch({
        type:UPDATE_QUANTILE,
        value
    })
}

export default modelMap.reduce((aggr, curr)=>({
    ...aggr, 
    ['update'+curr.name]:generateOptions(curr.name)
}), {
    //updateCalibration:generateOptions('calibrate'),
    updateSlider,
    updateQuantile,
    updateOptionForm
})

