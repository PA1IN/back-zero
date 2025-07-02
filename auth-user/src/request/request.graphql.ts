import { gql, GraphQLClient } from "graphql-request";

const url = 'http://localhost:3003/graphql';

const client = new GraphQLClient(url);

type SyncUserDeviceResponse = {
    syncUserDevice: string;
};

export const syncUserDevice = async (userId: number, ipDevice: string, operatingSystem: string): Promise<string> => {
    const mutation = gql`
        mutation SyncUserDevice($userId: Float!, $ipDevice: String!, $operatingSystem: String!) {
            syncUserDevice(userId: $userId, ipDevice: $ipDevice, operatingSystem: $operatingSystem)
        }
    `;

    const response = await client.request<SyncUserDeviceResponse>(mutation, { userId, ipDevice, operatingSystem});
    return response.syncUserDevice;
};