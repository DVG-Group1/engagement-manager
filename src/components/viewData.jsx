import React, { Component } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableBody,
	Card, CardText, CardTitle,
	// CardActions, RaisedButton,
	MenuItem, FlatButton, Dialog,
	SelectField, DatePicker, TextField
	} from 'material-ui';
import request from './../dataService';

var displayNames = {
	people: r => r && r.first_name ? r.first_name + ' ' + r.last_name : '',
	risk_dimensions: r => r.description,
	risk_assessments: (r, dataIndex) => `${displayNames.people(dataIndex.people[r.assesser])}'s assessment of ${displayNames.people(dataIndex.people[r.assessee])} on ${r.date_added}`
};
var getDisplayName = (tableName, row, dataIndex) => {
	return row ? row.id + ': ' + displayNames[tableName](row, dataIndex) : null;
};

var relationships = {
	'people.manager_id': 'people',
	'risk_assessments.assesser': 'people',
	'risk_assessments.assessee': 'people',
	'risk_dimension_options.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_assessment_id': 'risk_assessments'
};

class Editor extends Component {
	constructor(props){
		super(props);
		this.state = {
			editRecord: {...this.props.editRecord}
		};
	}
	handleValueChange = (col, val) => {
		console.log('Changing', col, val);
		var editRecord = {...this.state.editRecord};
		editRecord[col] = val;
		this.setState({editRecord});
	}
	render(){
		// var origRow = table.rows[this.state.editRowIndex];
		var keys = this.props.table.columns.map(c => c.column_name);

		var inputs = keys.filter(key => key !== 'id').map(key => {
			var input;
			var rel = relationships[this.props.table.name + '.' + key];
			var inputProps = {
				value: this.state.editRecord[key],
				floatingLabelText: key,
				style: {width: '100%'}
			};
			if (key.includes('date')){
				input = (
					<DatePicker
						onChange={(e, value) => this.handleValueChange(key, value)}
						{...inputProps}
					/>
				);
			} else if (rel){
				input = (
					<SelectField
						onChange={(e, k, value) => this.handleValueChange(key, value)}
						{...inputProps}
					>{
						this.props.tables.find(t => t.name === rel).rows.map(r =>
							<MenuItem key={r.id} value={r.id} primaryText={getDisplayName(rel, r, this.props.dataIndex)} />
						)
					}</SelectField>
				);
			} else {
				input = (
					<TextField
						onChange={e => this.handleValueChange(key, e.target.value)}
						{...inputProps}
					/>
				);
			}

			return (
				<div key={key}>
					{input}
				</div>
			);
		});
		return (
			<Dialog
				title="Edit"
				actions={[
					<FlatButton
						label="Cancel"
						onTouchTap={this.props.closeEditor}
					/>,
					<FlatButton
						label="Save"
						primary={true}
						onTouchTap={() => this.props.onSave(this.state.editRecord)}
					/>
				]}
				modal={true}
				open={true}
				onRequestClose={this.props.closeEditor}
			>
				{inputs}
			</Dialog>
		);
	}
}

class viewData extends Component {
	constructor(props){
		super(props);
		this.state = {
			tables: [],
			editTable: null,
			editRowIndex: null
		};
		window.$viewData = this;
	}
	componentDidMount(){
		request('allData').then(tables => {

			tables.forEach(t => {
				t.rows.sort((a, b) => a.id - b.id);

				var keys = t.columns.map(c => c.column_name);
				keys.forEach(k => {
					if (k.includes('date')){
						t.rows.forEach(r => {
							if (r[k]) r[k] = new Date(r[k]);
						});
					}
				});
			});

			this.setState({tables});
		}).catch(err => {
			console.log(err);
			throw err;
		});
	}
	openEditor = (table, rowIndex) => {
		this.setState({
			editTable: table,
			editRowIndex: rowIndex
		});
	}
	closeEditor = () => {
		this.setState({
			editTable: null,
			editRowIndex: null
		});
	}
	saveRecord = record => {
		request('save/' + this.state.editTable, record).then(() => {
			var tables = [...this.state.tables];
			var tableIndex = tables.findIndex(t => t.name === this.state.editTable);
			var rows = [...tables[tableIndex].rows];
			rows[this.state.editRowIndex] = record;
			tables[tableIndex] = {...tables[tableIndex], rows};

			this.setState({
				tables,
				editTable: null,
				editRowIndex: null
			});
		}).catch(this.props.onError);
	}
	render(){

		var dataIndex = this.state.tables.reduce((res, t) => {
			res[t.name] = t.rows.reduce((dex, r) => {
				dex[r.id] = r;
				return dex;
			}, {});
			return res;
		}, {});

		var cards = this.state.tables.map(t => {

			var keys = t.columns.map(c => c.column_name);

			return (
				<Card key={t.name} style={{marginBottom: 20}}>
					<CardTitle title={t.name}/>
					<CardText>
						<Table
							height={'300px'}
							onCellClick={(rowNum) => this.openEditor(t.name, rowNum)}
						>
						  <TableHeader
								displaySelectAll={false}
			          adjustForCheckbox={false}
			          enableSelectAll={false}
							>
						    <TableRow>{
									keys.map(col => <TableHeaderColumn key={col}>{ col }</TableHeaderColumn>)
								}</TableRow>
						  </TableHeader>
						  <TableBody
								displayRowCheckbox={false}
								showRowHover={true}
								style={{cursor: 'pointer'}}
							>{
								t.rows.map((row, i) => (
									<TableRow key={i}>{
										keys.map(col => {
											var rel = relationships[t.name + '.' + col];
											var input = rel ? getDisplayName(rel, dataIndex[rel][row[col]], dataIndex) : row[col];
											return (
												<TableRowColumn key={col}>{ '' + input }</TableRowColumn>
											);
										})
									}</TableRow>
								))
							}</TableBody>
						</Table>
					</CardText>
				</Card>
			);
		});

		// <CardActions>
		// 	<RaisedButton label='Add Row' onClick={() => this.addRow(t)} />
		// </CardActions>

		var editor = null;
		if (this.state.editTable !== null){
			console.log(this.state);
			var table = this.state.tables.find(t => t.name === this.state.editTable);
			editor = (
				<Editor
					table={table}
					tables={this.state.tables}
					editRecord={table.rows[this.state.editRowIndex]}
					dataIndex={dataIndex}
					closeEditor={this.closeEditor}
					onSave={this.saveRecord}
				/>
			);
		}

		return (
			<div>
				{ cards }
				{ editor }
			</div>
		);
	}
}

// import { connect } from 'react-redux'
// export default connect(
// 	(state, ownProps) => {
// 		return {};
// 	},
// 	(dispatch, ownProps) => {
// 		return {};
// 	}
// )(viewData);

export default viewData;
