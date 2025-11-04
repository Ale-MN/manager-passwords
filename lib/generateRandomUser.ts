export const generateRandomUsername = (length = 10) => {
  const adjectives = [
    "Quick",
    "Bright",
    "Funny",
    "Clever",
    "Silent",
    "Brave",
    "Happy",
    "Sly",
    "Wise",
    "Bold",
  ];
  const nouns = [
    "Mountain",
    "Watch",
    "Window",
    "Dog",
    "Road",
    "Guitar",
    "Book",
    "Cloud",
    "Ocean",
    "Fire",
  ];

  const randomItem = <T>(array: T[]): T => {
    if (array.length === 0) {
      throw new Error("El array no puede estar vacío.");
    }
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  };

  let username = "";
  username += randomItem(adjectives);
  username += randomItem(nouns);
  username += Math.floor(Math.random() * 10000);

  if (username.length > length) {
    username = username.substring(0, length);
  }

  return username;
};
