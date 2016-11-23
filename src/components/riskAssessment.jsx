import React, { Component } from 'react';
import { RaisedButton, TextField, RadioButton, RadioButtonGroup, Card, CardText, CardTitle } from 'material-ui';
import request from './../dataService';

const cardStyle = {marginBottom: 20};
const optionColors = ['#009E03', '#7FAD00', '#DECF00', '#D4A200', '#B50000'];

class RiskAssessment extends Component {
	constructor(props){
		super(props);
		this.state = {
			riskDimensions: [],
			answers: []
		};
		console.log(this.props);
	}
	componentDidMount(){
		request('riskDimensions').then(riskDimensions => {
			this.setState({riskDimensions});
		}).catch(this.props.onError);
		// this.props.loadRiskDimensions();
	}
	handleOptionChange(answer){
		this.setState({
			answers: [
				...this.state.answers.filter(a => a.id !== answer.id),
				answer
			]
		});
	}
	handleSubmit(){
		request('riskAssessment', {
			answers: this.state.answers,
			notes: this.state.notes,
			assesser: this.props.userID,
			assessee: this.props.assessee
		}).then(data => console.log(data)).catch(err => console.log(err));
	}
	render(){

		var assessee = this.props.people.find(p => p.id === +this.props.assessee) || {};
		var cards = this.state.riskDimensions.map(r => {

			var radios = r.options.map(o => {
				return (
					<RadioButton
						key={o.ord}
						value={o.ord}
						label={o.description.replace(/consultant/ig, assessee.first_name)}
						style={{marginBottom: 16, borderLeft: `5px solid ${optionColors[o.ord]}`, paddingLeft: 16}}
					/>
				);
			});

			return (
				<Card key={r.id} style={cardStyle}>
					<CardTitle title={r.description.replace(/consultant/ig, assessee.first_name)} />
					<CardText>
						<RadioButtonGroup
							name="riskOptions"
							onChange={(e, value) => this.handleOptionChange({id: r.id, value})}
						>{radios}</RadioButtonGroup>
					</CardText>
				</Card>
			);
		});

		return (
			<div>
				{ cards }
				<Card style={cardStyle}>
					<CardText>
						<TextField
				      floatingLabelText="Notes and comments."
				      multiLine={true}
				      rows={3}
							style={{width: '100%'}}
							value={this.state.notes}
							onChange={e => this.setState({notes: e.target.value})}
				    />
					</CardText>
				</Card>

				<RaisedButton label='Submit' primary={true} onClick={() => this.handleSubmit()} />
			</div>
		);
	}
}

// import { connect } from 'react-redux'
// export default connect(
// 	(state, ownProps) => { // map state to props
// 		return {
// 			riskDimensions: state.riskDimensions || []
// 		};
// 	},
// 	(dispatch, ownProps) => { // map dispatch to props
// 		return {
// 			loadRiskDimensions: () => dispatch({type: 'LOAD_RISK_DIMENSIONS'}),
// 			handleOptionChange: answer => {
//
// 			}
// 		};
// 	}
// )(RiskAssessment);

export default RiskAssessment;
