import React from 'react';
import { riskColors } from '../config';

const graphWidth = 500;
const graphHeight = 200;
const maxRating = 4;
const rad = 5;

export default props => {

	var lines = [];
	var minDate = Infinity;
	var maxDate = -Infinity;

	props.assessments.slice().reverse().forEach(a => {
		var date = Date.parse(a.date_added);
		minDate = Math.min(minDate, date);
		maxDate = Math.max(maxDate, date);
		a.riskDimensions.forEach(d => {
			if (d.rating){
				(lines[d.id] = lines[d.id] || []).push({
					x: date,
					y: d.rating.rating
				});
			}
		});
	});

	var toX = x => (x - minDate) / Math.max(1, maxDate - minDate) * (graphWidth - 2 * rad) + rad;
	var toY = y => (graphHeight - 2 * rad) * (1 - y / maxRating) + rad;

	var shapes = [];
	Object.keys(lines).forEach(dimensionID => {
		var line = lines[dimensionID];
		var path = (
			<path
				key={'p' + dimensionID}
				d={'M '+ line.map(c => toX(c.x) + ' ' + toY(c.y)).join(' L ')}
				fill="transparent"
				stroke="black"
			/>
		);
		var circles = line.map((c,i) => (
			<circle key={dimensionID + '-' + i} cx={toX(c.x)} cy={toY(c.y)} r={rad} fill={riskColors[c.y]} />
		));

		shapes = [...shapes, path, ...circles];
	});

	return (
		<svg width={graphWidth} height={graphHeight}>
			{ shapes }
		</svg>
	);
};
