export function getFullDate(year: number, month: number, date: number): string {
  // 다음 해로 넘어갔을 때
  if (month > 12) {
    const newMonth = month - 12;
    return `${year + 1}-${newMonth < 10 ? `0${newMonth}` : newMonth}-${
      date < 10 ? `0${date}` : date
    }`;
  }
  // 이전 해로 넘어갔을 때
  if (month < 1) {
    return `${year - 1}-01-${date < 10 ? `0${date}` : date}`;
  }
  return `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;
}
