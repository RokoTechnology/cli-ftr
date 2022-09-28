/*
export const prepareFiles = (files) => {
  const s = [];

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target.result;
      console.log("result", result, typeof result);
      const storyContents = JSON.parse(result as string);
      s.push(storyContents);
    };

    reader.readAsText(file);
  }

  console.log("all stories imported, resulting stories", s);
  return s;
};
*/

export const prepareFiles = (files) => {
  let promises = [];
  for (let file of files) {
    let filePromise = new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(JSON.parse(reader.result as string));
    });
    promises.push(filePromise);
  }

  return Promise.all(promises);
};
