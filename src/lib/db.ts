// In a production application, this would be a real database connection.
// For this demo, we'll use an in-memory array.

export interface Link {
  id: number;
  longUrl: string;
  shortCode: string;
  description: string;
  clicks: number;
  createdAt: Date;
}

// In-memory "database"
const links: Link[] = [];
let idCounter = 1;
const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encode(id: number): string {
    if (id === 0) return base62Chars[0];
    let shortCode = '';
    while (id > 0) {
        shortCode = base62Chars[id % 62] + shortCode;
        id = Math.floor(id / 62);
    }
    return shortCode.padStart(4, base62Chars[0]); // Pad to ensure a minimum length
}

export const getLinks = async (): Promise<Link[]> => {
  // Return a copy to prevent mutation
  return [...links].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const createLink = async (longUrl: string, description: string): Promise<Link> => {
  // In a real DB, you might want to return the existing link
  // to avoid duplicates, but for this demo we allow it.
  
  const newId = idCounter++;
  const newLink: Link = {
    id: newId,
    longUrl,
    shortCode: encode(newId),
    description,
    clicks: 0,
    createdAt: new Date(),
  };

  links.push(newLink);
  return newLink;
};

export const getLinkByCode = async (shortCode: string): Promise<Link | undefined> => {
  const link = links.find(l => l.shortCode === shortCode);
  if(link) {
    link.clicks++;
  }
  return link;
};
