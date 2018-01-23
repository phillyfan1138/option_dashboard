import {createValidationType, createOptionType} from '../appSkeleton'

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



export const updateCustom=generateOptions('custom')
export const updateHeston=generateOptions('heston')
export const updateBS=generateOptions('bs')
export const updateStrike=generateOptions('strike')
export const updatePrice=generateOptions('price')



