export function generateAbbreviatedDate(date: string): string {
    let dateArr = date.split(",");
    return dateArr[0];
  }