
import { CosmosClient } from "@azure/cosmos";

const endpoint: string = process.env.COSMOS_ENDPOINT || 'https://earthquake.documents.azure.com:443/';
const databaseName =  process.env.COSMOS_DB || 'earthquake' ;
const containerId =  process.env.COSMOS_CONTAINER_ID || 'events';

const key =  process.env.SECONDARY_KEY;


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