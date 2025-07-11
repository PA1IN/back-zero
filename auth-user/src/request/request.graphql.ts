type SyncUserDeviceResponse = {
  syncUserDevice: string;
};

export const syncUserDevice = async (
  userId: number,
  ipDevice: string,
  operatingSystem: string
): Promise<string> => {
  // Import dinámico dentro de la función
  const { GraphQLClient, gql } = await import("graphql-request");

  // Usa el nombre del contenedor en Docker si estás dentro de contenedores
  const url = 'http://192.168.1.4:3004/graphql';

  const client = new GraphQLClient(url);

  const mutation = gql`
    mutation SyncUserDevice($userId: Float!, $ipDevice: String!, $operatingSystem: String!) {
      syncUserDevice(userId: $userId, ipDevice: $ipDevice, operatingSystem: $operatingSystem)
    }
  `;

  const response = await client.request<SyncUserDeviceResponse>(mutation, {
    userId,
    ipDevice,
    operatingSystem,
  });

  return response.syncUserDevice;
};
