import React, { useState } from 'react';
import {StockPosition} from '../mainTypes';
import './trackedStockPosition.css';

type TrackedStockPositionProps = StockPosition & {
	changeTrackedStockShareQuantity: (targetSymbol: string, newShares: number) => void;
	stopTrackingStockPosition: (targetSymbol: string) => void;
}

export default function TrackedStockPosition({ symbol, shares, changeTrackedStockShareQuantity, stopTrackingStockPosition }: TrackedStockPositionProps) {
	const [formShares, changeFormShares] = useState(shares)

	function handleFormSharesChange(event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) {
		let parsedFormShares = Number(event.target.value);
		if(!isNaN(parsedFormShares))
			changeFormShares(parsedFormShares);
    }

	function submitNewShares(event: React.FocusEvent) {
		if(formShares !== shares)
			changeTrackedStockShareQuantity(symbol, formShares);
    }

	function stopTracking(event: React.MouseEvent) {
		stopTrackingStockPosition(symbol);
    }

	return (
		<div className='trackedStockPosition'>
			<div className='trackedStockPositionData'>
				<div className='trackedStockPositionValue'>{symbol}</div>
				<input className='trackedStockPositionValue' value={formShares} onChange={handleFormSharesChange} onBlur={submitNewShares}/>
				<div className='trackedStockPositionLabel'>symbol</div>
				<div className='trackedStockPositionLabel'>shares</div>
			</div>
			<div className='trackedStockPositionDeleteButton' onClick={stopTracking}>X</div>
		</div>
	);
}