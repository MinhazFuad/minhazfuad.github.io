import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper to read any folder in 'content/'
export function getCollection(collectionName: string) {
  const dir = path.join(process.cwd(), `content/${collectionName}`);
  
  if (!fs.existsSync(dir)) return [];

  const fileNames = fs.readdirSync(dir);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      content,
      ...(data as any),
    };
  });
}