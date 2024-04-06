export const fakeApi = (timeout = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, timeout);
  });
};
