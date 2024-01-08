// Timezone Example
const date = new Date("2024-01-07T16:30:01");

// Convert to Europe/Zagreb
const zagrebDate = new Date(date.toLocaleString("en-US",{timeZone: 'Europe/Zagreb'}));

// Dumpit to Crumpit
console.log(date.toLocaleString("en-US"), "\n", zagrebDate.toLocaleString("en-US"));