import fs from 'fs/promises';
import path from 'path';

// Define the path for the offline local database file
const dataDir = path.join(process.cwd(), '.data');
const dbPath = path.join(dataDir, 'portfolio_db.json');

// Default initial state
const defaultDb = {
    projects: [],
    gallery: [],
    settings: []
};

// Initialize the database file if it doesn't exist
const initDb = async () => {
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }

    try {
        await fs.access(dbPath);
    } catch {
        await fs.writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
    }
};

// Read data
export const readDb = async () => {
    await initDb();
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
};

// Write data
export const writeDb = async (data: Record<string, unknown>) => {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};
