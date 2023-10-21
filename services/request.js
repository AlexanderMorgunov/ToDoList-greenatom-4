export const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });
      if (!response.ok) {
        alert(
          `Error ${response.status}: Cannot make a request to the address ${url}`
        );
        throw new Error(`Could not fetch ${url}, status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      if (!navigator.onLine) {
        alert(`Error: no internet access`);
      } else {
        alert(`Error ${e.message}`);
      }
      throw e;
    }
  };

  return request;
};
