import moment from "moment";
//Email Validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

//Extracts first letters from user's full name to create profile.
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

//Converts numbers into a readable format with commas.
export const addThousandsSaperator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, , fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

//Converts expense data into a daily grouped format for bar charts.
export const prepareExpenseBarChartData = (data = []) => {
  const grouped = {};

  data.forEach((item) => {
    const day = moment(item.date).format("DD MMM");

    if (!grouped[day]) {
      grouped[day] = 0;
    }

    grouped[day] += item.amount;
  });

  return Object.keys(grouped).map((day) => ({
    day,
    amount: grouped[day],
  }));
};

//Sorts income data by date and formats it for bar charts.
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map((item) => ({
    day: moment(item?.date).format("Do MMM"), // match XAxis
    amount: item?.amount,
    source: item?.source,
  }));
};

//Converts expense data into a sorted, line chart–friendly format.
export const prepareExpenseLineChartData=(data=[])=>{
const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
 return sortedData.map((item) => ({
    day: moment(item?.date).format("Do MMM"), // match XAxis
    amount: item?.amount,
    category: item?.category,
  }));
}

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
