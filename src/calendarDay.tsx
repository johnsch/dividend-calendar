import React from 'react';
import './calendarDay.css';
import { StockValue } from './interfaces';

type CalendarDayProps = {
	dayKey: number,
    day?: number,
    stockValues?: StockValue[],
	borderSettings: BorderSettings
};

type BorderSettings = {
	borderLeft?: string,
	borderRight?: string,
	borderTop?: string,
	borderBottom?: string

};

export default function CalendaryDay({dayKey, day, stockValues, borderSettings }: CalendarDayProps) {
    function generateStockValueElements() {
        let stockValueElements: JSX.Element[] = [];

        if (stockValues)
            stockValues.forEach((stockValue) => {
                let element = <div className='stockValue'>
                    <span>{stockValue.symbol}: {stockValue.value.toFixed(2)}</span> 
                </div>;

                stockValueElements.push(element);
            });

        return stockValueElements;
    }

    return (
        <div className='calendarDay' style={borderSettings}>
            <h3>{day}</h3>
            <div className='stockValueContainer'>
                {generateStockValueElements()}
            </div>
        </div>
    );
};