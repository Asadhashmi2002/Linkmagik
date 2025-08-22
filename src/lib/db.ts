import * as fs from 'fs/promises';
import * as path from 'path';

// Note: In a serverless environment like Vercel, the file system is ephemeral.
// This means the links.json file will be reset on each new deployment or server restart.
// For persistent storage, a database (like Vercel Postgres, Supabase) or a service like Upstash Redis would be required.
const dbPath = path.join(process.cwd(), 'links.json');

export interface Link {
  id: number;
  longUrl: string;
  shortCode: string;
  description: string;
  clicks: number;
  createdAt: Date;
}

interface LinkData {
    links: Link[];
    idCounter: number;
}

const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

async function readDb(): Promise<LinkData> {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        const parsedData = JSON.parse(data);
        // Ensure createdAt is a Date object
        parsedData.links.forEach((link: any) => {
            link.createdAt = new Date(link.createdAt);
        });
        return parsedData;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // If the file doesn't exist, initialize with default structure
            return { links: [], idCounter: 1 };
        }
        throw error;
    }
}

async function writeDb(data: LinkData) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}


function encode(id: number): string {
    if (id === 0) return base62Chars[0];
    let shortCode = '';
    while (id > 0) {
        shortCode = base62Chars[id % 62] + shortCode;
        id = Math.floor(id / 62);
    }
    return shortCode.padStart(4, base62Chars[0]);
}

export const getLinks = async (): Promise<Link[]> => {
  const db = await readDb();
  return [...db.links].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const createLink = async (longUrl: string, description: string): Promise<Link> => {
    const db = await readDb();

    const existingLink = db.links.find(link => link.longUrl === longUrl);
    if (existingLink) {
      return existingLink;
    }

    const newId = db.idCounter++;
    const newLink: Link = {
        id: newId,
        longUrl,
        shortCode: encode(newId),
        description,
        clicks: 0,
        createdAt: new Date(),
    };

    db.links.push(newLink);
    await writeDb(db);
    return newLink;
};

export const getLinkByCode = async (shortCode: string): Promise<Link | undefined> => {
  const db = await readDb();
  const link = db.links.find(l => l.shortCode === shortCode);
  if(link) {
    link.clicks++;
    await writeDb(db);
  }
  return link;
};
