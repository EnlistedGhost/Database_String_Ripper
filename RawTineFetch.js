// 1. Grab raw milliseconds (system time since Jan 1, 1970)
const rawMs = Date.now(); 

// Define constants in milliseconds
const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerYear = msPerDay * 365.25; // Accounting for leap years

// 2. Perform manual division and remainder math
// Year (Starting from 1970)
const yearsSinceEpoch = Math.floor(rawMs / msPerYear);
const year = 1970 + yearsSinceEpoch;

// Remaining MS after years are removed
let remainingMs = rawMs % msPerYear;

// Month (Approximate - 30.44 days per month)
const msPerMonth = msPerDay * 30.44;
const month = Math.floor(remainingMs / msPerMonth) + 1; // Months are 1-indexed
remainingMs %= msPerMonth;

// Day
const day = Math.floor(remainingMs / msPerDay) + 1;
remainingMs %= msPerDay;

// Hour
const hour = Math.floor(remainingMs / msPerHour);
remainingMs %= msPerHour;

// Minute
const minute = Math.floor(remainingMs / msPerMinute);

console.log(`Raw MS: ${rawMs}`);
console.log(`Converted: ${year}-${month}-${day} ${hour}:${minute}`);
