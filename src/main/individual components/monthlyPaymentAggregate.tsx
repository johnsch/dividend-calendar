import React from 'react';
import './monthlyPaymentAggregate.css';
import {DividendPayment} from '../mainTypes';

type MonthlyPaymentAggregateProps = {
	dividendPayments: DividendPayment[],	
	user: string
};

export default function MonthlyPaymentAggregate({dividendPayments, user}: MonthlyPaymentAggregateProps) {
	let totalPayment = 0;

	dividendPayments.forEach((dividend) => totalPayment += dividend.amount);

	return(
		<div className='monthlyPaymentAggregate'>
			<span><h3>Total: </h3><p> ${totalPayment.toFixed(2)}</p></span>
			<span style={{float: "right"}}><h3>User: </h3><p> {user}</p></span>
		</div>
	);
}