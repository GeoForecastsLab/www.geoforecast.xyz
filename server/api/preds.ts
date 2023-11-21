
import { CosmosClient } from "@azure/cosmos";

const endpoint: string = process.env.COSMOS_ENDPOINT as string;
const key =  process.env.AZ_SECONDARY_KEY;

const databaseName =  process.env.COSMOS_DB as string;
const containerId =  process.env.COSMOS_CONTAINER_ID as string;

const cosmosClient = new CosmosClient({ 
    endpoint,
    key
});
const database = cosmosClient.database(databaseName);
const container = database.container(containerId);

async function readAllEvents() {
    return container.items.readAll().fetchAll();
}

export default defineEventHandler(async (event) => {
    const {resources} = await readAllEvents();
    return { result: resources }
})