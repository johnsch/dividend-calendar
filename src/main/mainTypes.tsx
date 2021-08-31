export type MainState = {
    selectedYear: number,
    selectedMonth: number,
    user: string,
    bearerTokenData: BearerTokenData,
    stockPositions: StockPosition[],
    dividendPayments: DividendPayment[]
};

export type InitialDataPayload = {
    user: string,
    bearerTokenData: BearerTokenData,
    stockPositions: StockPosition[],
    dividendPayments: DividendPayment[]
};

export type ChangeStockPositionsPayload = {
    stockPositions: StockPosition[],
    dividendPayments: DividendPayment[]
};

export type BearerTokenData = {
    token: string,
    ttl: number,
    issuedAt: number,
    expiration: number
};

export type DividendPayment = {
    symbol: string,
    year: number,
    month: number,
    day: number,
    shares: number,
    amount: number
    type: 'actual' | 'est'
}

export type StockPosition = {
    symbol: string,
    shares: number
};
