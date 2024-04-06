/**
 * Fake api to simulate api delay
 * @param timeout value in ms to solve the promise
 * @returns Promise<unknown>
 */
export const fakeApi = (timeout = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, timeout);
  });
};
