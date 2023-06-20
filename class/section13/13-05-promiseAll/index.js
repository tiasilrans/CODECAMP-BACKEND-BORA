const fetchData = async () => {
  console.time("== 개별 프로미스 ==");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 2000);
  });
  console.timeEnd("== 개별 프로미스 ==");
};

fetchData();

const fetchData2 = async () => {
  console.time("== ALL 프로미스 ==");
  const results = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 2000);
    }),
  ]);
  console.log(results);
  console.timeEnd("== ALL 프로미스 ==");
};
fetchData2();
