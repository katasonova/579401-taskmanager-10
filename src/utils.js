const Months = [`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`];

export const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const format = hours >= 12 ? `PM` : `AM`;
  hours = hours % 12 ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${format}`
};

export const formatDate = (date) => {
  let day = date.getDate();
  let month = Months[date.getMonth()]

  return `${day} ${month}`
};
