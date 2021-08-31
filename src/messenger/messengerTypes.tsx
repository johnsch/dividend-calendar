export type DividendRequestData = {
    dividendCalendarList: DividendData[],
    dividendCalendarAgList: DividendAgData[]
};

export type DividendAgData = {
    agType: string,
    symbolList: string[],
    paymentYear: number,
    paymentMonth: number,
    amountTotal: number
};

export type DividendData = {
    type: "actual" | "est",
    symbol: string,
    shares: number,
    frequency: 'unspecified' | 'monthly' | 'quarterly' | 'semi-annual' | 'annual',
    amountPerShare: number,
    exDate: string,
    paymentDate: string,
    paymentYear: number,
    paymentMonth: number,
    paymentDay: number,
    amountTotal: number
};

export type TokenRequestData = {
    user: string,
    symbols: string,
    shares: string,
    token: string,
    ttl: number,
    issuedAt: number,
    expiration: number
}

export type UserSymbolsShares = {
    user: string,
    symbols: string,
    shares: string
}
