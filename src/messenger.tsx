import { TokenData, DividendRequestData } from './interfaces';
var CryptoJS = require("crypto-js");

export function getBearerToken(): Promise<TokenData> {
	return new Promise((resolve, reject) => {
		// let requestUrl = 'http://localhost:8080/v1/token';
		let requestUrl = 'https://ibo-financials.com/v1/token';
		// let requestUrl = 'http://localhost:8080/v1/user?user=' + process.env.REACT_APP_USERNAME + '&password=' + process.env.REACT_APP_PASSWORD;
		// let requestUrl = 'https://ibo-financials.com/v1/user?user=' + process.env.REACT_APP_USERNAME + '&password=' + process.env.REACT_APP_PASSWORD;
		// let requestUrl = 'http://192.168.1.7:8080/v1/user?user=' + process.env.REACT_APP_USERNAME + '&password=' + process.env.REACT_APP_PASSWORD;

		let tokenJson = JSON.stringify({userName : process.env.REACT_APP_USERNAME, password : process.env.REACT_APP_PASSWORD, issueDate : Date.now()});
		let token = encrypt(tokenJson);

		fetch(requestUrl, { 
			method: 'POST', 
			headers: { 
				"Content-Type" : "text/plain"
			  , "Authorization" : process.env.REACT_APP_BASIC_AUTH
			  //, "X-Forwarded-Remote-User" : "linda" 
		    },
			body: token
		})
			.then(response => response.json())
			.then(data => { resolve( data ) });
	});
}

export async function getDividendPayments(data: TokenData): Promise<DividendRequestData> {
	return new Promise((resolve, reject) => {
		// let requestUrl = 'http://localhost:8080/v1/dividends/calendar/';
		let requestUrl = 'https://ibo-financials.com/v1/dividends/calendar/';
		// let requestUrl = 'http://192.168.1.7:8080/v1/dividends/calendar/';
		let symbolQuery = data.symbols;
		let sharesQuery = data.shares;

		// stockPositions.forEach((position) => {
		// 	symbolQuery += position.symbol + ',';
		// 	sharesQuery += position.shares + ',';
		// })

		let bearerToken = data.token;

		requestUrl += symbolQuery + '/' + sharesQuery + '/date?user=' + data.user;

		fetch(requestUrl, { 
			headers: { Authorization: bearerToken } 
		})
			.then(request => request.json())
			.then(data => { resolve( data) });

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