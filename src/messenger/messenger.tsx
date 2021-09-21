import {
	UserSymbolsShares,
	DividendPaymentResponseData,
	TokenRequestData
} from './messengerTypes';
import {
	StockPosition,
	BearerTokenData
} from '../main/mainTypes';
var CryptoJS = require("crypto-js");

export function getBearerToken(): Promise<TokenRequestData> {
	return new Promise((resolve, reject) => {
		let requestUrl = 'https://ibo-financials.com/v1/token';
		// let requestUrl = 'http://192.168.1.7:7070/v1/token';
		// let requestUrl = 'http://localhost:7070/v1/token';

		let tokenJson = JSON.stringify({userName : process.env.REACT_APP_USERNAME, password : process.env.REACT_APP_PASSWORD, issueDate : Date.now()});
		let token = encrypt(tokenJson);

		let headers = new Headers();
		headers.append('Content-Type', 'text/plain');
		// headers.append('x-forwarded-remote-user', 'linda');

		fetch(requestUrl, { 
			method: 'POST', 
			headers: headers,
			body: token,
			redirect: 'follow'
		})
		.then(response => response.json())
		.then(data => { resolve( data ) })
		.catch(error => console.log('error', error));
	});
}


export async function getDividendPayments(stockPositions: StockPosition[], bearerTokenData: BearerTokenData, user: string): Promise<DividendPaymentResponseData> {
	return new Promise((resolve, reject) => {
		let requestUrl = 'https://ibo-financials.com/v1/dividends/calendar/';
		// let requestUrl = 'http://192.168.1.7:7070/v1/dividends/calendar/';
		// let requestUrl = 'http://localhost:7070/v1/dividends/calendar/';

		let symbolQuery = '';
		let sharesQuery = '';

		stockPositions.forEach((position) => {
			symbolQuery += position.symbol + ',';
			sharesQuery += position.shares + ',';
		});

		symbolQuery = symbolQuery.slice(0, symbolQuery.length - 1); //slices off the ',' at the end.
		sharesQuery = sharesQuery.slice(0, sharesQuery.length - 1);

		let bearerToken = bearerTokenData.token;

		requestUrl += symbolQuery + '/' + sharesQuery + '/date';

		fetch(requestUrl, { 
			headers: { 
				Authorization: bearerToken,
				'x-forwarded-remote-user': user
			},
			redirect: 'follow' 
		})
		.then(request => request.json())
		.then(data => { resolve( data) })
		.catch(error => console.log('error', error));

	});
}

export async function getUserSymbolsShares(data: TokenRequestData): Promise<UserSymbolsShares> {
	return new Promise((resolve, reject) => {
		let requestUrl = 'https://ibo-financials.com/v1/userSymbolsShares';
		// let requestUrl = 'http://192.168.1.7:7070/v1/userSymbolsShares';

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		fetch(requestUrl, { 
			method: 'POST', 
			headers: headers,
			redirect: 'follow'
		})
		.then(request => request.json())
		.then(data => { resolve( data) })
		.catch(error => console.log('error', error));
	});
}

export function encryptOld(value: String): string {
	return CryptoJS.AES.encrypt(value, process.env.REACT_APP_SECRET).toString();
}

export function encrypt(value: String): string {
	var parsedBase64Key = CryptoJS.enc.Base64.parse(process.env.REACT_APP_SECRET);
	var encryptedData = CryptoJS.AES.encrypt(value, parsedBase64Key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
		});

	return encryptedData;
}