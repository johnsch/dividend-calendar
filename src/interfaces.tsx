export type MainState = {
    selectedYear: number,
    selectedMonth: number,
    bearerToken: string,
    dividendPayments: DividendPayment[]
};

export type TokenData = {
	 "user": string,
	 "symbols": string,
	 "shares": string,
	 "token": string,
	 "ttl": number,
	 "issuedAt": number,
	 "expiration": number
}

export type UserSymbolsShares = {
	 "user": string,
	 "symbols": string,
	 "shares": string
}

export type DividendRequestData = {
    "dividendCalendarList": DividendData[],
    "dividendCalendarAgList": DividendAgData[]
};

export type DividendAgData = {
    "agType": string,
    "symbolList": string[],
    "paymentYear": number,
    "paymentMonth": number,
    "amountTotal": number
};

export type DividendData = {
    "type": "actual" | "estimate",
    "symbol": string,
    "shares": number,
    "frequency": 'unspecified' | 'monthly' | 'quarterly' | 'semi-annual' | 'annual',
    "amountPerShare": number,
    "exDate": string,
    "paymentDate": string,
    "paymentYear": number,
    "paymentMonth": number,
    "paymentDay": number;
    "amountTotal": number
};

export type DividendPayment = {
    symbol: string,
    year: number,
    month: number,
    day: number,
    shares: number,
    amount: number
    type: 'actual' | 'estimate'
}

export type StockPosition = {
    symbol: string,
    shares: number
};

export interface StockValue  {
    symbol: string,
    value: number,
    type: 'actual' | 'estimate'
};

export enum MonthNames {
    January = 'January',
    February = 'February',
    March = 'March',
    April = 'April',
    May = 'May',
    June = 'June',
    July = 'July',
    August = 'August',
    September = 'September',
    October = 'October',
    November = 'November',
    December = 'December'
};

export interface MonthData {
    name: string,
    days: number,
    startingDay: number,
	monthNumber: number
}

export const months = {
    January: { name: 'January', days: 31, monthNumber: 1 },
    February: { name: 'February', days: 28, monthNumber: 2 },
    March: { name: 'March', days: 31, monthNumber: 3 },
    April: { name: 'April', days: 30, monthNumber: 4 },
    May: { name: 'May', days: 31, monthNumber: 5 },
    June: { name: 'June', days: 30, monthNumber: 6 },
    July: { name: 'July', days: 31, monthNumber: 7 },
    August: { name: 'August', days: 31, monthNumber: 8 },
    September: { name: 'September', days: 30, monthNumber: 9 },
    October: { name: 'October', days: 31, monthNumber: 10 },
    November: { name: 'November', days: 30, monthNumber: 11},
    December: { name: 'December', days: 31, monthNumber: 12 }
};