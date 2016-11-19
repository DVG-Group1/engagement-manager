// var people = [{
// 	name: 'Boss Bossman'
// }, {
// 	name: 'Bob Bobson',
// 	manager: 0
// }, {
// 	name: 'Tim Timberg',
// 	manager: 0
// }, {
// 	name: 'Jeff Jefferson',
// 	manager: 0
// }];

var riskFactors = [{
	text: 'Consultant Morale and Connection',
	options: [
		'Consultant is very happy in current role and current client assignment.',
		'Consultant is generally happy in current role, and current client assigment.',
		'Consultant is somewhat bored in current role and find that current client assignment is tolerable, but not happy about it. ',
		'Consultant is very unhappy in current role, and/or is very unhappy with current client assignment.',
		'Consultant is very unhappy / ineffective in current role and current client assignments, and is actively seeking new opportunities'
	]
}, {
	text: 'Business Development Effectiveness',
	options: [
		'Very effective CSA2; consultant is actively engaged in business development',
		'',
		'Moderately effective CSA2; consultant will act if directed, but does not take independent action',
		'',
		'Little or no CSA2 activity; consultant is not engaged and disinterested in business development'
	]
}, {
	text: 'Client Satisfaction',
	options: [
		'Client is completely satisfied with Daugherty consultant (e.g., skillset, attitude, work habits) and the work product ',
		'',
		'Client is generally satisfied with Daugherty consultant (e.g., skillset, attitude, work habits, etc.) and/or work products',
		'',
		'Client is very dissatisfied with Daugherty consultants (e.g., skillset, attitude, work habits, etc.) and/or the work product'
	]
}, {
	text: 'Repeat Likelihood',
	options: [
		'High repeat likelihood based on delivery success and long-term client relationship',
		'Probable repeat likelihood based on delivery success and long-term client relationship',
		'Moderate repeat likelihood, but dependent on unknown or unpredictable factors',
		'Little or no repeat likelihood due to client budgetary issues or leadership changes',
		'Little or no repeat likelihood due to delivery issues or other changes'
	]
}, {
	text: 'Daugherty Management Visibility',
	options: [
		'Regular delivery oversight (including technical / functional QAs). Strong relationships at senior client levels',
		'',
		'Regular delivery oversight (including technical / functional QAs), but limited business relationships ',
		'',
		'Infrequent delivery oversight (e.g., technical, functional QAs,). Little or no relationships at senior client levels'
	]
}, {
	text: 'Overall Consultant Risk Trend',
	options: [
		'Risk level for this consultant is greatly improving',
		'Risk level for this consultant is slightly improving',
		'Risk level for this consultant is unchanged',
		'Risk level for this consultant is slightly increasing',
		'Risk level for this consultant is greatly increasing'
	]
}];

var optionColors = ['#009E03', '#7FAD00', '#DECF00', '#D4A200', '#B50000'];

export {riskFactors, optionColors};
