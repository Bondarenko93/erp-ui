import mainApi from "./index";

export const getClients = async () => {
  const clientsData = await mainApi.get("/clients");
  return clientsData.data;
};

export const addClient = async (body: ClientObject) => {
  await mainApi.post("/clients", body);
};

export const deleteClient = async (id: string) => {
  await mainApi.delete(`/clients/${id}`);
};

export const editClient = async (id: string, body: { name: string }) => {
  const client = await mainApi.patch(`/clients/${id}`, body);
  return client.data;
};
