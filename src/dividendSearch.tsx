import React, { useState } from 'react';
import {DividendPayment, StockPosition} from './interfaces';
import TrackedStockPosition from './trackedStockPosition';

type dividendSearchProps = {
	dividendPayments: DividendPayment[];
	//changeDividendData: (symbol: string, shares: number) => void;
}

export default function DividendSearch({dividendPayments, /*changeDividendData*/}: dividendSearchProps){

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

	let stockPositions: JSX.Element[] = [];
	let loadedStocks: string[] = [];

	dividendPayments.forEach((dividend) => {

		if (!loadedStocks.some((symbol) => symbol === dividend.symbol)) {
			loadedStocks.push(dividend.symbol);

			let trackedStockPosition = <TrackedStockPosition symbol={dividend.symbol} shares={dividend.shares} />;

			stockPositions.push(trackedStockPosition);
		}
	});

	loadedStocks = [];

	return (
		<div id='dividendSearch'>
			<form>
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