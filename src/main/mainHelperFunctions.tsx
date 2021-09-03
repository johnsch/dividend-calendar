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

export function addStockPosition(originalStockPositions: StockPosition[], targetSymbol: string, targetShares: number): StockPosition[] {
    let newStockPositions: StockPosition[] = [];

    originalStockPositions.forEach((position) => {
        let newPosition = Object.assign({}, position);
        newStockPositions.push(newPosition);
    });

    newStockPositions.push({ symbol: targetSymbol, shares: targetShares });

    return newStockPositions;
}

export function removeStockPosition(originalStockPositions: StockPosition[], targetSymbol: string): StockPosition[] {
    let newStockPositions: StockPosition[] = [];

    originalStockPositions.forEach((position) => {
        if (position.symbol !== targetSymbol) {
            let newPosition = Object.assign({}, position);
            newStockPositions.push(newPosition);
        }
    });

    return newStockPositions;
}

export function removeDividendPayment(originalDividendPayments: DividendPayment[], targetSymbol: string): DividendPayment[] {
    let newDividendPayments: DividendPayment[] = [];

    originalDividendPayments.forEach((payment) => {
        if (payment.symbol !== targetSymbol) {
            let newPayment = Object.assign({}, payment);
            newDividendPayments.push(newPayment);
        }
    });

    return newDividendPayments;
}

export function changeStockPositionShareQuantity(originalStockPositions: StockPosition[], targetSymbol: string, targetShares: number): StockPosition[] {
    let newStockPositions: StockPosition[] = [];

    originalStockPositions.forEach((position) => {
        if (position.symbol !== targetSymbol) {
            let newPosition = Object.assign({}, position);
            newStockPositions.push(newPosition);
        }
    });

    newStockPositions.push({ symbol: targetSymbol, shares: targetShares });

    return newStockPositions;
}