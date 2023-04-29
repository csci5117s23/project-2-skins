// dateFunctions.js
// --------------------------------------------------------------------------------------
// Date functions
// Code reference: https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
// --------------------------------------------------------------------------------------

// -------------------------------------------------------------------
// Function that converts a Date to format: (Tuesday, April 2nd, 2023)
// Parameters: inputDate (type: Date) --> returns (type: string)
// -------------------------------------------------------------------
export function formatDateWeekday(inputDate) {
    return inputDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
}
// -------------------------------------------------------------------
// Function that formats a Date to format: (April 2nd, 2023)
// Parameters: inputDate (type: Date) --> returns (type: string)
// -------------------------------------------------------------------
export function formatDate(inputDate) {
    return inputDate.toLocaleDateString('en-us', { month:"long", day:"numeric"}) 
}
// ---------------------------------------------------------------------
// Function that calculates the number of days between a date and today
// Parameters: inputDate (type: Date) --> returns int days
// ---------------------------------------------------------------------
export function getDays(inputDate){
    return Math.ceil((inputDate.getTime() - new Date().getTime())/(1000*60*60*24));
}
// --------------------------------------------------------------------------
// Function to sort by most recent date to least recent:
// Reference: https://stackoverflow.com/questions/3859239/sort-json-by-date
// --------------------------------------------------------------------------
export function dateSort(item1, item2) {   
    return  new Date(item2.createdOn).getTime() - new Date(item1.createdOn).getTime();
}
