import React from 'react';
import {DividendPayment, StockPosition} from './interfaces';
import TrackedStockPosition from './trackedStockPosition';

type dividendSearchProps = {
	dividendPayments: DividendPayment[];
	//changeDividendData: (symbol: string, shares: number) => void;
}

export default function DividendSearch({dividendPayments, /*changeDividendData*/}: dividendSearchProps){
	
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
			<div className='trackedStockPosition-container'>
				{stockPositions}
			</div>
		</div>
	);
}