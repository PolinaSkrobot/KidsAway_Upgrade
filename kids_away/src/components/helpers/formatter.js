//formatting date function
export default function formatDate(date) {
  console.log('date inside help', date);
  let formattedDate = date.toString().split(' ').slice(0, 4).join(" ")

  let d = new Date(formattedDate),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
};