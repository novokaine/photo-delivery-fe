export const BASE_URL: string = "http://localhost:8000/api";

export const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) throw new Error("Cannot fetch data");
  return await response.json();
};
