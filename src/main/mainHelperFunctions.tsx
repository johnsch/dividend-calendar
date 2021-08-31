import {
    getBearerToken,
    getDividendPayments
} from "../messenger/messenger";
import { DividendPaymentResponseData } from "../messenger/messengerTypes";
import {
    BearerTokenData,
    DividendPayment,
    InitialDataPayload,
    StockPosition
} from "./mainTypes";

export async function getInitialData() {

    let bearerTokenResponseData = await getBearerToken();

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

    let dividendPaymentResponseData = await getDividendPayments(newStockPositionData, newBearerTokenData, currentUser);

    let newDividendPayments = parseDividendPaymentResponseDataIntoDividendPayments(dividendPaymentResponseData);

    let initialDataPayload: InitialDataPayload = {
        user: currentUser,
        bearerTokenData: newBearerTokenData,
        stockPositions: newStockPositionData,
        dividendPayments: newDividendPayments
    };

    return initialDataPayload;

}

export function parseDividendPaymentResponseDataIntoDividendPayments(responseData: DividendPaymentResponseData): DividendPayment[] {
    let newDividendPayments: DividendPayment[] = [];

    responseData.dividendCalendarList.forEach((current) => {

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

    return newDividendPayments;
}

export function cloneStockPositions(originalStockPositions: StockPosition[]): StockPosition[] {
    let newStockPositions: StockPosition[] = [];

    originalStockPositions.forEach((position) => {
        let newPosition = Object.assign({}, position);
        newStockPositions.push(newPosition);
    });

    return newStockPositions;
}