import { gql, GraphQLClient } from "graphql-request";

const url = 'http://localhost:3003/graphql';

const client = new GraphQLClient(url);

type SyncUserDeviceResponse = {
    syncUserDevice: string;
};

export const syncUserDevice = async (userId: number): Promise<string> => {
    const mutation = gql`
        mutation SyncUserDevice($userId: Float!) {
            syncUserDevice(userId: $userId)
        }
    `;

    const response = await client.request<SyncUserDeviceResponse>(mutation, { userId });
    return response.syncUserDevice;
};