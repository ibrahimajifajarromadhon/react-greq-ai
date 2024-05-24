export const typeText = (setData, text, language, callback) => {
  const regex = language === "ID" ? /[^\w\s]|_/g : /[^\w\s]|_/g;
  const cleanText = text.replace(regex, "").replace(/\s+/g, " ");
  const words = cleanText.split(" ");
  let i = 0;

  const intervalId = setInterval(() => {
    setData((prev) => prev + words[i] + " ");
    i++;
    if (i === words.length) clearInterval(intervalId);
    callback();
  }, 100);
};
