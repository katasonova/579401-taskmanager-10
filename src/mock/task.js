const Description = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

const DueDate = {};

const RepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

const Tags = [`homework`,`theory`,`practice`,`intensive`,`keks`];

const Color = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRandomArrayElement = (array) => {
  array[Math.floor(Math.random() * array.length)];
};

const getRandomBoolean = () => {
  Math.random() >= 0.5;
}

const generateTask = () => {
  return {
    description: getRandomArrayElement(Description),
    dueDate: new Date(),
    repeatingDays:``,
    tags: new Set(Tags),
    color: getRandomArrayElement(Color),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  }
};
