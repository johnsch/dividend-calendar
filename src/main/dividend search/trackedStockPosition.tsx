import React from 'react';
import {StockPosition} from '../mainTypes';
import './trackedStockPosition.css';

export default function TrackedStockPosition({symbol, shares}: StockPosition){
	return (
		<div className='trackedStockPosition'>
			<div className='trackedStockPositionData'>
				<div className='trackedStockPositionValue'>{symbol}</div>
				<div className='trackedStockPositionValue'>{shares}</div>
				<div className='trackedStockPositionLabel'>symbol</div>
				<div className='trackedStockPositionLabel'>shares</div>
			</div>
			<div className='trackedStockPositionDeleteButton'>X</div>
		</div>
	);
}