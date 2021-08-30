import { TokenData, UserSymbolsShares, DividendRequestData } from './interfaces';
var CryptoJS = require("crypto-js");

export async function getUserSymbolsShares(data: TokenData): Promise<UserSymbolsShares> {
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

export function getBearerToken(): Promise<TokenData> {
	return new Promise((resolve, reject) => {
		let requestUrl = 'https://ibo-financials.com/v1/token';
		// let requestUrl = 'http://192.168.1.7:7070/v1/token';
		// let requestUrl = 'http://localhost:7070/v1/token';

		let tokenJson = JSON.stringify({userName : process.env.REACT_APP_USERNAME, password : process.env.REACT_APP_PASSWORD, issueDate : Date.now()});
		let token = encrypt(tokenJson);

		let headers = new Headers();
		headers.append('Content-Type', 'text/plain');
		headers.append('x-forwarded-remote-user', '');

		fetch(requestUrl, { 
			method: 'POST', 
			headers: headers,
			body: token,
			redirect: 'follow'
		})
		.then(response => {return response.json()})
		.then(data => { resolve( data ) })
		.catch(error => console.log('error', error));
	});
}


export async function getDividendPayments(data: TokenData): Promise<DividendRequestData> {
	return new Promise((resolve, reject) => {
		let requestUrl = 'https://ibo-financials.com/v1/dividends/calendar/';
		// let requestUrl = 'http://192.168.1.7:7070/v1/dividends/calendar/';
		//let requestUrl = 'http://localhost:7070/v1/dividends/calendar/';

		let symbolQuery = data.symbols;
		let sharesQuery = data.shares;

		let bearerToken = data.token;
		let user = data.user;

		requestUrl += symbolQuery + '/' + sharesQuery + '/date';

		fetch(requestUrl, { 
			headers: { Authorization: bearerToken, 'x-forwarded-remote-user': user },
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

// export function getHeaders() : string {
// 	let loc = document.location.origin;

// 	var req = new XMLHttpRequest();
// 	req.open('GET', loc, false);
// 	req.send(null);
// 	var headers = req.getAllResponseHeaders().toLowerCase();
	
// 	var iboHeadersArray = headers.split(/\n|\r|\r\n/g).reduce(function(a, b) {
// 		if (b.length) {
// 			var [ key, value ] = b.split(': ');
// 			a[key] = value;
// 		}
// 		return a;
// 	}, {});

// 	return ib
// }

