import React, { useReducer, useEffect } from 'react';
import CalendarMonth from './calendar/calendarMonth';
import MonthlyPaymentAggregate from './monthlyPaymentAggregate';
import Summary from './summary';
import { months, MonthData, } from './monthData';
import { StockPosition, DividendPayment, MainState, BearerTokenData, InitialDataPayload, ChangeStockPositionsPayload } from './mainTypes';
import { getBearerToken, getDividendPayments } from '../messenger/messenger';
import './main.css';
import DividendSearch from './dividend search/dividendSearch';
import mainReducer from './mainReducer';

let currentDate = new Date();

const defaultState: MainState = {
    selectedMonth: currentDate.getMonth() + 1,
    selectedYear: currentDate.getFullYear(),
    user: '',
    bearerTokenData: { token: '', ttl: 0, issuedAt: 0, expiration: 0 },
    stockPositions: [],
    dividendPayments: []
};


export default function Main() {
    const [state, dispatch] = useReducer(mainReducer, defaultState);

    useEffect(() => {

        getBearerToken().then((bearerTokenResponseData) => {

            let currentUser = bearerTokenResponseData.user;

            let newBearerTokenData: BearerTokenData = {
                token: bearerTokenResponseData.token,
                ttl: bearerTokenResponseData.ttl,
                issuedAt: bearerTokenResponseData.issuedAt,
                expiration: bearerTokenResponseData.expiration
            };

            let newStockSymbols = bearerTokenResponseData.symbols.split(',');
            let newStockShares = bearerTokenResponseData.shares.split(',');
            let newStockPositionData: StockPosition[] = [];

            newStockSymbols.forEach((newSymbol, index) => {
                let newStockPosition: StockPosition = { symbol: newSymbol, shares: Number(newStockShares[index]) };
                newStockPositionData.push(newStockPosition);
            });

            getDividendPayments(newStockPositionData, newBearerTokenData, currentUser).then((dividendPaymentResponseData) => {

                let newDividendPayments: DividendPayment[] = [];

                dividendPaymentResponseData.dividendCalendarList.forEach((current) => {

                    let dividendPayment: DividendPayment = {
                        symbol: current.symbol,
                        year: current.paymentYear,
                        month: current.paymentMonth,
                        day: current.paymentDay,
                        shares: current.shares,
                        amount: current.amountTotal,
                        type: current.type
                    };

                    newDividendPayments.push(dividendPayment);
                });

                let initialDataPayload: InitialDataPayload = {
                    user: currentUser,
                    bearerTokenData: newBearerTokenData,
                    stockPositions: newStockPositionData,
                    dividendPayments: newDividendPayments
                };

                dispatch({ type: 'setInitialData', payload: initialDataPayload });

            });
        });
    }, [])

    function addStockPosition(newSymbol: string, newShares: number) {
        if (!state.stockPositions.some((position) => position.symbol === newSymbol)) {
            let newStockPositions: StockPosition[] = [];

            state.stockPositions.forEach((position) => {
                let newPosition = Object.assign({}, position);
                newStockPositions.push(newPosition);
            });

            newStockPositions.push({ symbol: newSymbol, shares: newShares });

            getDividendPayments(newStockPositions, state.bearerTokenData, state.user).then((dividendPaymentResponseData) => {
                let newDividendPayments: DividendPayment[] = [];

                dividendPaymentResponseData.dividendCalendarList.forEach((current) => {

                    let dividendPayment: DividendPayment = {
                        symbol: current.symbol,
                        year: current.paymentYear,
                        month: current.paymentMonth,
                        day: current.paymentDay,
                        shares: current.shares,
                        amount: current.amountTotal,
                        type: current.type
                    };

                    newDividendPayments.push(dividendPayment);
                });

                let changeStockPositionsPayload: ChangeStockPositionsPayload = {
                    stockPositions: newStockPositions,
                    dividendPayments: newDividendPayments
                };

                dispatch({ type: 'changeStockPositions', payload: changeStockPositionsPayload });
            })
        }
            
    }

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
				<MonthlyPaymentAggregate dividendPayments={dividendPaymentsForMonth}/>
            </div>
            <DividendSearch dividendPayments={state.dividendPayments} addStockPosition={addStockPosition}/>
			<Summary month={monthData} year={state.selectedYear} dividendPayments={state.dividendPayments}/>
        </div>
    );    
}