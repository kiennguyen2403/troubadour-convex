export default function millisecondsToDdMm(milliseconds) {
  // Convert milliseconds to seconds
  var seconds = milliseconds / 1000;
  // Create a new Date object using the milliseconds
  var date = new Date(seconds * 1000); // Multiply by 1000 to convert to milliseconds
  // Get day and month
  var day = date.getDate();
  var month = date.getMonth() + 1; // Month starts from 0, so add 1
  // Format day and month with leading zeros if needed
  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;
  // Return formatted string in dd/mm format
  return formattedDay + "/" + formattedMonth;
}
