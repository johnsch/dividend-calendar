import React from 'react';
import {StockPosition} from '../mainTypes';
import './trackedStockPosition.css';

type TrackedStockPositionProps = StockPosition & {
	stopTrackingStockPosition: (targetSymbol: string) => void;
}

export default function TrackedStockPosition({ symbol, shares, stopTrackingStockPosition }: TrackedStockPositionProps) {

	function stopTracking(event: React.MouseEvent) {
		stopTrackingStockPosition(symbol);
    }

	return (
		<div className='trackedStockPosition'>
			<div className='trackedStockPositionData'>
				<div className='trackedStockPositionValue'>{symbol}</div>
				<div className='trackedStockPositionValue'>{shares}</div>
				<div className='trackedStockPositionLabel'>symbol</div>
				<div className='trackedStockPositionLabel'>shares</div>
			</div>
			<div className='trackedStockPositionDeleteButton' onClick={stopTracking}>X</div>
		</div>
	);
}