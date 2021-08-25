import React from 'react';
import {StockPosition} from './interfaces';
import './trackedStockPosition.css';

export default function TrackedStockPosition({symbol, shares}: StockPosition){
	return(
		<div className='trackedStockPosition'>
			<div>{symbol}</div>
			<div>{shares}</div>
		</div>
	);
}