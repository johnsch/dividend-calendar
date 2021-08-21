import React from 'react';
import {MonthData, DividendPayment} from './interfaces';

type summaryProps = {
	month: MonthData,
	year: number,
	dividendPayments: DividendPayment[]
};

export default function Summary({month, year, dividendPayments}: summaryProps){
	
	let monthPaymentListings: JSX.Element[] = [];

	let monthTotal = 0;
	let actualPaymentTotal = 0;
	let estimatedPaymentTotal = 0;

	dividendPayments.forEach((dividend) => {
		if(dividend.year === year){
			estimatedPaymentTotal += dividend.amount;

			if(dividend.type === 'actual')
				actualPaymentTotal += dividend.amount;
			if(dividend.month === month.monthNumber){
				monthTotal += dividend.amount;
				
				let listing = <div className={dividend.type === 'actual' ? 'actualMonthPaymentListing' : 'estimatedMonthPaymentListing'}>
								<h3>{dividend.symbol}: </h3><p> {dividend.amount.toFixed(2)}</p>
							  </div>;

				monthPaymentListings.push(listing);
			}
		}
	});

	return(
		<div className='summary'>
			<h2>Monthly Summary for {month.name} {year}</h2>
			{monthPaymentListings}
			<h2>Yearly summary for {year}</h2>
			<h3>Confirmed: </h3><p>{actualPaymentTotal.toFixed(2)}</p>
			<h3>Estimated: </h3><p>{estimatedPaymentTotal.toFixed(2)}</p>
		</div>
	);
}