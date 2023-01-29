export default function delay(ms) {
  return new Promise((res, rej) => {
    if (!ms) {
      return rej(`Invalid time ${ms}ms`);
    }
    setTimeout(() => {
      res(true);
    }, ms);
  });
}
