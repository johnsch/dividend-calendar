import React, { useState } from 'react';
import { StockPosition} from '../mainTypes';
import TrackedStockPosition from './trackedStockPosition';
import './dividendSearch.css';

type dividendSearchProps = {
	stockPositions: StockPosition[];
	trackNewStockPosition: (symbol: string, shares: number) => void;
	changeTrackedStockShareQuantity: (targetSymbol: string, newShares: number) => void;
	stopTrackingStockPosition: (symbol: string) => void;
}

export default function DividendSearch({stockPositions, trackNewStockPosition, changeTrackedStockShareQuantity, stopTrackingStockPosition}: dividendSearchProps){

	const [formSymbol, changeFormSymbol] = useState('');
	const [formShares, changeFormShares] = useState<number>();


	function handleFormChange(event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) {
		switch (event.target.name) { 
			case 'symbol': changeFormSymbol(event.target.value);
				break;

			case 'shares':
				let newFormShares = Number(event.target.value);
				if (isNaN(newFormShares))
					newFormShares = 0;
					changeFormShares(newFormShares);
				break;

			default:
				throw new Error();
		}
    }

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (formShares && formSymbol)
			trackNewStockPosition(formSymbol, formShares);
    }

	let trackedStockPositionComponents: JSX.Element[] = [];
	
	
	stockPositions.forEach((position) => {
		let newTrackedStockPosition = <TrackedStockPosition key={position.symbol} symbol={position.symbol} shares={position.shares} changeTrackedStockShareQuantity={changeTrackedStockShareQuantity} stopTrackingStockPosition={stopTrackingStockPosition}/>;
		

		trackedStockPositionComponents.push(newTrackedStockPosition);

	});
	

	return (
		<div id='dividendSearch'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='symbol'>Stock Symbol: </label> <input type='text' id='symbol' name='symbol' value={formSymbol} onChange={handleFormChange} />
				<label htmlFor='shares'>Shares: </label> <input type='text' id='shares' name='shares' value={formShares} onChange={handleFormChange} />
				<input type='submit' value='Track ' />
			</form>

			<div className='trackedStockPosition-container'>
				{trackedStockPositionComponents}
			</div>
		</div>
	);
}