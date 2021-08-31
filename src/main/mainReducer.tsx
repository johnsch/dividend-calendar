import React from 'react';
import {
    BearerTokenData,
    ChangeStockPositionsPayload,
    DividendPayment,
    InitialDataPayload,
    MainState
} from "./mainTypes";

type MainActionType =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'setBearerTokenData', payload: BearerTokenData }
    | { type: 'setDividendPayments', payload: DividendPayment[] }
    | { type: 'setInitialData', payload: InitialDataPayload }
    | { type: 'changeStockPositions', payload: ChangeStockPositionsPayload };


export default function MainReducer(state: MainState, action: MainActionType): MainState {
    switch (action.type) {
        case 'increment':
            if (state.selectedMonth === 12)
                return ({
                    selectedYear: state.selectedYear + 1,
                    selectedMonth: 1,
                    user: state.user,
                    bearerTokenData: state.bearerTokenData,
                    stockPositions: state.stockPositions,
                    dividendPayments: state.dividendPayments
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth + 1,
                    user: state.user,
                    bearerTokenData: state.bearerTokenData,
                    stockPositions: state.stockPositions,
                    dividendPayments: state.dividendPayments
                });

        case 'decrement':
            if (state.selectedMonth === 1)
                return ({
                    selectedYear: state.selectedYear - 1,
                    selectedMonth: 12,
                    user: state.user,
                    bearerTokenData: state.bearerTokenData,
                    stockPositions: state.stockPositions,
                    dividendPayments: state.dividendPayments
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth - 1,
                    user: state.user,
                    bearerTokenData: state.bearerTokenData,
                    stockPositions: state.stockPositions,
                    dividendPayments: state.dividendPayments
                });

        case 'setBearerTokenData':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                user: state.user,
                bearerTokenData: action.payload,
                stockPositions: state.stockPositions,
                dividendPayments: state.dividendPayments
            });

        case 'setDividendPayments':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                user: state.user,
                bearerTokenData: state.bearerTokenData,
                stockPositions: state.stockPositions,
                dividendPayments: action.payload
            });

        case 'setInitialData':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                user: action.payload.user,
                bearerTokenData: action.payload.bearerTokenData,
                stockPositions: action.payload.stockPositions,
                dividendPayments: action.payload.dividendPayments
            });

        case 'changeStockPositions':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                user: state.user,
                bearerTokenData: state.bearerTokenData,
                stockPositions: action.payload.stockPositions,
                dividendPayments: action.payload.dividendPayments
            });

        default:
            throw new Error();
    }
}