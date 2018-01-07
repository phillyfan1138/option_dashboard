import React from 'react'
import {createArray, handleForm} from '../utils'
import CustomDrop from './FormHelper'
import {getAllData} from '../Actions/lambda'
import { connect } from 'react-redux'
import {
    updateCustom,
    updateHeston
} from '../Actions/parameters'
import { Row, Col, Form, Button } from 'antd'

import {
    rhoOptions,
    speedOptions,
    adaOptions,
    sigmaOptions
} from './globalOptions'

const convertHestonToCustomAda=(c, b)=>c/Math.sqrt(b)
const convertHestonToCustomSig=b=>Math.sqrt(b)
const convertHestonToCustomV0=(v0, b)=>v0/b

const v0Options=createArray(.01, .25, .01)
const HestonForm=({customParameters, hestonParameters, submitOptions, updateHeston})=>(
    <Form onSubmit={handleForm(submitOptions, customParameters)}>
        <Row gutter={16}>
            <Col span={12}>
                <CustomDrop 
                    objKey='speed' 
                    round={1}
                    parms={hestonParameters}
                    options={speedOptions}
                    toolTip="Speed of mean reversion of variance process"
                    label="Speed"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='meanVol' 
                    round={2}
                    parms={hestonParameters}
                    options={sigmaOptions}
                    toolTip="Long run average of the variance process"
                    label="Average Vol"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='adaV' 
                    round={2}
                    parms={hestonParameters}
                    options={adaOptions}
                    toolTip="This is the volatility of the variance process"
                    label="Vol of Vol"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='v0' 
                    round={2}
                    parms={hestonParameters}
                    options={v0Options}
                    toolTip="This is the current value of the variance process."
                    label="V0"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='rho' 
                    round={2}
                    parms={hestonParameters}
                    options={rhoOptions}
                    toolTip="Correlation between asset and variance"
                    label="Rho"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col span={12}>
                <Button className='side-button submit-button' type="primary" htmlType="submit">Update</Button>
            </Col>
        </Row>
    </Form>
)

const mapStateToPropsHeston=state=>({
    hestonParameters:state.hestonParameters,
    customParameters:state.customParameters
})
const mapDispatchToPropsHeston=dispatch=>({
    updateHeston:(key, value, hestonParameters)=>{
        const {v0, adaV, meanVol}=hestonParameters
        updateHeston(key, value, dispatch)
        updateCustom('C', 0, dispatch)
        switch(key){
            case 'adaV':{
                const customAda=convertHestonToCustomAda(value, meanVol)
                updateCustom(key, customAda, dispatch)
                break
            }
            case 'meanVol':{
                const customAda=convertHestonToCustomAda(adaV, value)
                const customV0=convertHestonToCustomV0(v0, value)
                const customSig=convertHestonToCustomSig(value)
                updateCustom('adaV', customAda, dispatch)
                updateCustom('v0', customV0, dispatch)
                updateCustom('sigma', customSig, dispatch)
                break
            }
            case 'v0':{
                const customV0=convertHestonToCustomV0(value, meanVol)
                updateCustom('v0', customV0, dispatch)
                break
            }
            default:{
                updateCustom(key, value, dispatch)
            }
        } 
    },
    submitOptions:vals=>getAllData(vals, dispatch)
})
export default connect(
    mapStateToPropsHeston, 
    mapDispatchToPropsHeston
)(HestonForm)