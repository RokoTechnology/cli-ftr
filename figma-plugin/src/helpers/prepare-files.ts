export const prepareFiles = (files) => {
  console.log("reading files", files);
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
