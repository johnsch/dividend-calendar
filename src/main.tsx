import React, { useReducer, useEffect } from 'react';
import CalendarMonth from './calendarMonth';
import { MonthNames, months, MonthData, StockPosition, DividendPayment, MainState, DividendData } from './interfaces';
import { getBearerToken, getDividendPayments } from './messenger';
import { testStockPositions, testDividendData } from './testing/testData';
import './main.css';

let currentDate = new Date();

const initialState: MainState = {
    selectedMonth: currentDate.getMonth() + 1,
    selectedYear: currentDate.getFullYear(),
    bearerToken: '',
    dividendPayments: []
};

type ACTIONTYPE =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'setBearerToken', payload: string }
    | { type: 'setDividendPayments', payload: DividendPayment[] };


function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch(action.type) {
        case 'increment':
            if (state.selectedMonth === 12)
                return ({
                    selectedYear: state.selectedYear + 1,
                    selectedMonth: 1,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth + 1,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });

        case 'decrement':
            if (state.selectedMonth === 1)
                return ({
                    selectedYear: state.selectedYear - 1,
                    selectedMonth: 12,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth - 1,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });

        case 'setBearerToken':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                bearerToken: action.payload,
                dividendPayments: state.dividendPayments
            });

        case 'setDividendPayments':
            console.log(action.payload);
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                bearerToken: state.bearerToken,
                dividendPayments: action.payload
            });
        default:
            throw new Error();
    }
}


function parseDividendPaymentData(data: DividendData[]): DividendPayment[] {
    let newDividendPayments: DividendPayment[] = [];
    
    data.forEach((current) => {
        let parsedDate = current.paymentDate.split('-');

        let dividendPayment: DividendPayment = {
            symbol: current.symbol,
            year: Number(parsedDate[0]),
            month: Number(parsedDate[1]),
            day: Number(parsedDate[2]),
            amount: current.amountTotal,
            type: current.type
        };

        newDividendPayments.push(dividendPayment);
    });

    return newDividendPayments;
}


export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        getBearerToken().then((data) => {
            getDividendPayments(data).then((data) => {
                console.log(data);
                //dispatch({ type: 'setBearerToken', payload: token });
                let parsedDividendPayments = parseDividendPaymentData(data.dividendCalendarList);
                dispatch({ type: 'setDividendPayments', payload: parsedDividendPayments })
            });
        });
    }, [])

    let dateObject = new Date();
    let monthObject = Object.values(months).find(monthObject => monthObject.monthNumber === state.selectedMonth);
    
    dateObject.setMonth(state.selectedMonth - 1);
    dateObject.setFullYear(state.selectedYear);
    dateObject.setDate(1);

    let monthData: MonthData = Object.assign({ startingDay: dateObject.getDay() }, monthObject);
    let dividendPaymentsForMonth: DividendPayment[] = [];

    state.dividendPayments.forEach((dividendPayment: DividendPayment) => {
        if (dividendPayment.year === state.selectedYear
            && dividendPayment.month === state.selectedMonth)
            dividendPaymentsForMonth.push(dividendPayment);
    });

    return (
        <div>
            <div id='calendar'>
                <div id='cycleMonthButtonContainer'>
                    <div className='cycleMonthButton' onClick={() => dispatch({ type: 'decrement' })}>&lt;</div>
                    {state.selectedYear}
                    <div className='cycleMonthButton' onClick={() => dispatch({ type: 'increment' })}>&gt;</div>
                </div>
                <CalendarMonth month={monthData} dividendPayments={dividendPaymentsForMonth}/>
            </div>
        </div>
    );    
}