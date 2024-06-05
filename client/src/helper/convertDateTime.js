function convertDateTime(inputDateTime) {
  const inputDate = new Date(inputDateTime);
  inputDate.setFullYear(inputDate.getUTCFullYear() - 1); // Subtract 1 year
  inputDate.setUTCHours(12, 0, 0, 0); // Set time to 12:00 PM
  return inputDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
}

export default convertDateTime;
