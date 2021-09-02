import React, { useState } from 'react';
import {DividendPayment} from '../mainTypes';
import TrackedStockPosition from './trackedStockPosition';
import './dividendSearch.css';

type dividendSearchProps = {
	dividendPayments: DividendPayment[];
	trackNewStockPosition: (symbol: string, shares: number) => void;
	stopTrackingStockPosition: (symbol: string) => void;
}

export default function DividendSearch({dividendPayments, trackNewStockPosition, stopTrackingStockPosition}: dividendSearchProps){

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

	let stockPositions: JSX.Element[] = [];
	let loadedStocks: string[] = [];

	dividendPayments.forEach((dividend) => {

		if (!loadedStocks.some((symbol) => symbol === dividend.symbol)) {
			loadedStocks.push(dividend.symbol);

			let trackedStockPosition = <TrackedStockPosition symbol={dividend.symbol} shares={dividend.shares} stopTrackingStockPosition={stopTrackingStockPosition}/>;

			stockPositions.push(trackedStockPosition);
		}
	});

	loadedStocks = [];

	return (
		<div id='dividendSearch'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='symbol'>Stock Symbol: </label> <input type='text' id='symbol' name='symbol' value={formSymbol} onChange={handleFormChange} />
				<label htmlFor='shares'>Shares: </label> <input type='text' id='shares' name='shares' value={formShares} onChange={handleFormChange} />
				<input type='submit' value='Track ' />
			</form>

			<div className='trackedStockPosition-container'>
				{stockPositions}
			</div>
		</div>
	);
}