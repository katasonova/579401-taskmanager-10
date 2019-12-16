const Description = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = () => {
  const targetDate = new Date();
  const weekDifference = Math.random() > 0.5 ? 1 : -1;
  const diffValue = weekDifference * getRandomNumber(0, 6);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const RepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

const Tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const Color = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateTags = (tagsArray) => tagsArray.filter(() => Math.random() > 0.5).slice(0, 3);

const generateRepeatingDays = () => {
  return Object.assign({}, RepeatingDays, {
    'mo': Math.random() > 0.5,
  });
};

const getRandomBoolean = () => Math.random() >= 0.5;

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayElement(Description),
    dueDate,
    repeatingDays: dueDate ? RepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayElement(Color),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  };
};

const generateTasks = (number) => {
  return new Array(number).fill().map(generateTask);
};

export {generateTasks};
