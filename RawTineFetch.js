const rawMs = Date.now();

// 1. Adjust for GMT-8 (8 hours * 60 mins * 60 secs * 1000 ms)
const offsetMs = 8 * 60 * 60 * 1000;
const localMs = rawMs - offsetMs;

// 2. Break down into days and remaining time
const msPerDay = 24 * 60 * 60 * 1000;
let totalDays = Math.floor(localMs / msPerDay);
let remainingMs = localMs % msPerDay;

// 3. Determine the Year (Accounting for Leap Years)
let year = 1970;
while (true) {
    // Leap year rule: divisible by 4, but not 100 unless divisible by 400
    const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    const daysInYear = isLeap ? 366 : 365;

    if (totalDays < daysInYear) break;
    totalDays -= daysInYear;
    year++;
}

// 4. Determine the Month (Using correct days per month)
const isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
const monthDays = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let month = 0;
while (totalDays >= monthDays[month]) {
    totalDays -= monthDays[month];
    month++;
}

// 5. Final Calculations
const finalMonth = month + 1; // Months are 1-indexed
const finalDay = totalDays + 1; // Days are 1-indexed
const finalHour = Math.floor(remainingMs / (60 * 60 * 1000));
const finalMinute = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));

console.log(`PST Time: ${year}-${finalMonth}-${finalDay} ${finalHour}:${finalMinute}`);
