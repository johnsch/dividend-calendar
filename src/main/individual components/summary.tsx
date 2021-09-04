import React from 'react';
import { MonthData } from '../monthData';
import { DividendPayment } from '../mainTypes';
import './summary.css';

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
				
				let listing = <div className={dividend.type + ' paymentListing'} key={dividend.symbol} >
								<h4>{dividend.symbol}: </h4><p> ${dividend.amount.toFixed(2)}</p>
							  </div>;

				monthPaymentListings.push(listing);
			}
		}
	});

	return(
		<div className='summary'>
			<h2>Monthly Summary for {month.name} {year}</h2>
			{monthPaymentListings}
			<div className='paymentListing' style={{ borderTop: '1px solid black' }}>
				<h4>Total: </h4><p> ${monthTotal.toFixed(2)}</p>
			</div>
			<h2>Yearly Summary for {year}</h2>
			<div className='paymentListing actual'>
				<h4>Confirmed: </h4><p>${actualPaymentTotal.toFixed(2)}</p>
			</div>
			<div className='paymentListing est'>
				<h4>Estimated: </h4><p>${estimatedPaymentTotal.toFixed(2)}</p>
			</div>
		</div>
	);
}