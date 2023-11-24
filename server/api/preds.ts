
import { CosmosClient } from "@azure/cosmos";

const endpoint: string = process.env.COSMOS_ENDPOINT || 'https://earthquake.documents.azure.com:443/';
const databaseName =  process.env.COSMOS_DB || 'earthquake' ;
const containerId =  process.env.COSMOS_CONTAINER_ID || 'events';

const key =  process.env.SECONDARY_KEY;


function lazyLoadingSupplier<T>(initializer: () => T): () => T {
    let cached: T | null = null;
    let hasBeenInitialized = false;

    return () => {
        if (!hasBeenInitialized) {
            cached = initializer();
            hasBeenInitialized = true;
        }
        return cached as T;
    };
}

const cosmosClientFn = lazyLoadingSupplier(() => {
    console.log("Initializing CosmosClient...");
    const client = new CosmosClient({ 
        endpoint,
        key
    });
    const database = client.database(databaseName);
    const container = database.container(containerId);
    return { client, container }
});

async function readAllEvents() {
    const {container} = cosmosClientFn();
    return container.items.readAll().fetchAll();
}

export default defineEventHandler(async (event) => {
    const {resources} = await readAllEvents();
    return { result: resources }
})