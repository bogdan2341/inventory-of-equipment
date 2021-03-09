import moment from "moment";

export const getMonthByWeeks = (year: number, month: number): number[][] => {
  const monthMoment = moment(`${year}-${month}`);
  const firstWeekDay = (monthMoment.date(1).weekday() || 7) - 1;
  const daysInMonth = monthMoment.endOf("month").date();
  const arr = [
    ...[...Array(firstWeekDay)].map((el) => 0),
    ...[...Array(daysInMonth)].map((el, idx) => idx + 1),
  ];
  const newArr = [];
  for (let index = 0; index < arr.length; index += 7) {
    newArr.push(arr.slice(index, index + 7));
  }

  return newArr;
};

export const getMonthDaysInArray = (year: number, month: number): number[] => {
  const monthMoment = moment(`${year}-${month}`);
  const daysInMonth = monthMoment.endOf("month").date();
  return [...[...Array(daysInMonth)].map((el, idx) => idx + 1)];
};

export const getMonthAsString = (month: string): string => {
  const date = new Date("2012-" + month + "-01");

  const monthName = new Intl.DateTimeFormat("ru-RU", { month: "long" }).format;
  const longName = monthName(date); // "July"
  return longName;
};

export const dateFormat = (date: Date, format: string) => {
  return moment(date).format(format);
};
