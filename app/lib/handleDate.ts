const num2mon = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

const mon2num = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12',
}

export function encodeDate(date:string | undefined = ''):string {
  let res = date;
  try {
    const temp = date.split('-');

    res = `${temp[0]} ${num2mon[temp[1]]} ${temp[2]}`
  } catch(err) {
    throw Error(err+'');
  }
  
  return res;
}

export function decodeDate(date:string | undefined = ''):string {
  let res = date || '';
  try {
    const temp = date.split(' ');

    res = `${temp[0]}-${mon2num[temp[1]]}-${temp[2]}`
  } catch(err) {
    throw Error(err+'');
  }
  
  return res;
}

export default encodeDate;