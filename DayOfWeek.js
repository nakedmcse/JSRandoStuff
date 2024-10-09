// Day of Week
// Zellers Congruence

function dayOfWeek(year, month, day) {
    if(month < 3) {
        month += 12;
        year -= 1;
    }

    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const k = year % 100;
    const j = Math.floor(year / 100);
    const f = day + Math.floor((13 * (month + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - (2 * j);

    return days[f % 7];
}

console.log(dayOfWeek(2024, 10, 8)); // Should be Tue
console.log(dayOfWeek(1879, 3, 14)); // Should be Fri