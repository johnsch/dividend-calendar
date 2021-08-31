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