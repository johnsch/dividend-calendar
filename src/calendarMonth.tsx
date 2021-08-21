import React from 'react';
import { months, StockValue, DividendPayment } from './interfaces';
import CalendarDay from './calendarDay';
import './calendarMonth.css';

type CalendarMonthProps = {
    month: {
        name: string,
        days: number,
        startingDay: number
    },
    dividendPayments: DividendPayment[]
}

type BorderSettings = {
	borderLeft?: string,
	borderRight?: string,
	borderTop?: string,
	borderBottom?: string
};


export default function CalendarMonth({ month, dividendPayments }: CalendarMonthProps) {
    let { name, days, startingDay} = month;
    let dayKey = 1;
	let emptyDaySlots = startingDay+1;
	let daysToResetWeek = 6;

    let calendarDays: JSX.Element[] = [];

	function setBorders() {
		let borderSettings: BorderSettings = {};

		if(dayKey === 1  //Days on the left of the calendar
		|| ( dayKey - 1) % 7 === 0)
		borderSettings.borderLeft = '2px solid black';

		if(dayKey % 7 === 0) //Days on the right of the calendar
		borderSettings.borderRight = '2px solid black';

		if(dayKey < 8) //Days on the top of the calendar
		borderSettings.borderTop = '2px solid black';

		if (dayKey < 29 && dayKey > 21) //Days on the second to last row of the calendar	
		borderSettings.borderBottom = '2px solid black';

		if(dayKey > 28) {
			borderSettings.borderTop = '0px';
			borderSettings.borderBottom = '2px solid black';
		}

		return borderSettings;
	}
	


    for (let x = 0; x < startingDay; x++){
        calendarDays.push(<CalendarDay key={dayKey} dayKey={dayKey} borderSettings={setBorders()}/>);
		dayKey++;
	}

    for (let i = 1; i <= days; i++) {
        let stockValues: StockValue[] = [];

        dividendPayments.forEach(dividendPayment => {
            if (dividendPayment.day === i) {
                let stockValueObject: StockValue = {
                    symbol: dividendPayment.symbol,
                    value: dividendPayment.amount,
                    type: dividendPayment.type
                };
                stockValues.push(stockValueObject);
            }
        });

        calendarDays.push(<CalendarDay key={dayKey} dayKey={dayKey} day={i} stockValues={stockValues} borderSettings={setBorders()}/>);
		dayKey++;
	}

    return ( 
        <div className='calendar'>
            <div id='monthLabel'><h2>{name}</h2></div>
            <div id='dayLabelContainer'>
                <div className='dayLabel'>SUN</div>
                <div className='dayLabel'>MON</div>
                <div className='dayLabel'>TUES</div>
                <div className='dayLabel'>WED</div>
                <div className='dayLabel'>THURS</div>
                <div className='dayLabel'>FRI</div>
                <div className='dayLabel'>SAT</div>
            </div>
            <div className='calendarDaysContainer'>
                {calendarDays}
            </div>
        </div>


    );

}