import React from 'react';
import './monthlyPaymentAggregate.css';
import {DividendPayment} from '../mainTypes';

type MonthlyPaymentAggregateProps = {
	dividendPayments: DividendPayment[]
};

export default function MonthlyPaymentAggregate({dividendPayments}: MonthlyPaymentAggregateProps) {
	let totalPayment = 0;

	dividendPayments.forEach((dividend) => totalPayment += dividend.amount);

	return(
		<div className='monthlyPaymentAggregate'>
			<h3>Total: </h3><p> ${totalPayment.toFixed(2)}</p>
		</div>
	);
}