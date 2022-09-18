export const getData = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
