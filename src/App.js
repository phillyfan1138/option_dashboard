import React from 'react'
import './App.css'
import { sensitivities } from './appSkeleton'
import { modelMap } from './modelSkeleton'
import { FangOost, CarrMadan, FSTS, FangOostHelp, FSTSHelp, CarrMadanHelp } from './Graphs/Algorithms'
import { Density } from './Graphs/Density'
import LoadData from './LoadData'
import ModalInputs from './Forms/ModalInputs'
import QuantileInputs from './Forms/QuantileInputs'
import CardPlot from './Cards/CardPlot'
import { Row, Col, Dropdown, Layout, Card, Menu } from 'antd'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { upperFirstLetter } from './Utils/utils'
import { rootModel, rootSensitivity, modalInputsIndex, inputsUrl } from './Routes/routeDefinitions'
const style = {
	background: 'whitesmoke',
	margin: 0,
	minHeight: 280
}

const [priceName]=sensitivities
const [FirstModel]=modelMap
const Content=Layout.Content
const paramUrl=`/:${rootModel}/:${rootSensitivity}`
const baseUrl='/'
const redirectUrl=`${FirstModel.name}/${priceName}`
const fangOostHelpUrl='/fangoost/help'
const carrMadanHelpUrl='/carrmadan/help'
const fstsHelpUrl='/fsts/help'

const floatRight={ float:'right',  }
const colBreaks={ sm:24, md:12, xl:6 }
const modelChoiceGenerator = handleMenuClick=>(
	<Menu onClick={e=>handleMenuClick(e.key)}>
	{modelMap.map(({name, label})=>(
		<Menu.Item key={name}>{label}</Menu.Item>
	))}
	</Menu>
)
const colorStyle={backgroundColor: 'whitesmoke'}
const MenuSensitivities=({history, sensitivity, modelLink, label})=>{
	const goToInputModal=modelLink=>{
		history.push(`/${modelLink}/${sensitivity}/${inputsUrl}/manual`)
	}
	return (
		<Menu 
			theme="light" 
			mode="horizontal" 
			selectedKeys={ [sensitivity] }
			style={colorStyle}
		>
			{
				sensitivities.map(sensitivity=>(
					<Menu.Item key={sensitivity}>
						<Link to={`/${modelLink}/${sensitivity}`}> {upperFirstLetter(sensitivity)} </Link>
					</Menu.Item>
				))
			}
			<div>
				<Dropdown.Button 
					key={1}
					style={floatRight}
					onClick={()=>goToInputModal(modelLink)}
					overlay={modelChoiceGenerator(goToInputModal)}
				>
					{label}: Inputs
				</Dropdown.Button>
			</div>
		</Menu>
	)	
}

const WrapModalInputs=({model, modelLink, sensitivity})=>{
	const baseUrl=`/${modelLink}/${sensitivity}`
	return (
	<Route 
		path={`${baseUrl}/${inputsUrl}/:${modalInputsIndex}`} 
		render={({match, history})=>(
			<ModalInputs 
				model={model}
				baseUrl={baseUrl}
				match={match}
				history={history}
			/> 
		)}
	/>
	)
}
const HoldCards=({match, ...rest})=>{
	const rootModelLink=match.params[rootModel]
	const rootSensitivityLink=match.params[rootSensitivity]
	const currentModel=modelMap.find(({name})=>rootModelLink===name)
	return [
	<LoadData key={-1} model={currentModel}/>,
	<WrapModalInputs 
		sensitivity={rootSensitivityLink}
		modelLink={rootModelLink}
		model={currentModel}
		key={0}
	/>,
	<MenuSensitivities 
		sensitivity={rootSensitivityLink}
		modelLink={rootModelLink}
		model={currentModel}
		label={currentModel.label}
		{...rest} 
		key={1}
	/>,
	<Row gutter={16} type="flex" justify="space-between" key={2}>
		<Col {...colBreaks} >
			<CardPlot
				Algorithm={CarrMadan} 
				title="Carr-Madan" 
				HelpComponent={CarrMadanHelp}
				url={carrMadanHelpUrl}
				match={match}
				model={currentModel}
				{...rest}
			/>
		</Col>
		<Col {...colBreaks} >
			<CardPlot 
				Algorithm={FSTS} 
				title="Fourier Space Time Step" 
				HelpComponent={FSTSHelp}
				url={fstsHelpUrl}
				match={match}
				{...rest}
				model={currentModel}
			/>
		</Col>
		<Col {...colBreaks} >
			<CardPlot 
				Algorithm={FangOost} 
				title="Fang-Oosterlee" 
				HelpComponent={FangOostHelp}
				url={fangOostHelpUrl}
				match={match}
				model={currentModel}
				{...rest}
			/>
		</Col>
		<Col {...colBreaks} >
			<Card title="Density" bordered={false} >
				<Density />
				<QuantileInputs model={currentModel}/>
			</Card>
		</Col>
	</Row>
	]
}

export default ()=>(
	<Layout>
		<Content style={style}>
			<div className='container'>
				<Switch>
					<Route path={paramUrl} component={HoldCards}/>
					<Redirect from={baseUrl} exact to={redirectUrl} />
				</Switch>
			</div>
		</Content>
	</Layout>
)

