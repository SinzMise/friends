import { readFileSync, existsSync } from 'fs';
import { parse } from 'yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 尝试多个可能的路径
function findLinksYml(): string {
  const possiblePaths = [
    join(process.cwd(), 'links.yml'),
    join(__dirname, '..', '..', 'links.yml'),
    join(__dirname, '..', '..', '..', 'links.yml'),
  ];

  for (const p of possiblePaths) {
    if (existsSync(p)) {
      return p;
    }
  }

  // 默认使用 process.cwd()
  return join(process.cwd(), 'links.yml');
}

export interface LinkItem {
  name: string;
  link: string;
  avatar: string;
  descr: string;
  siteshot?: string;
}

export interface LinkCategory {
  class_name: string;
  class_desc: string;
  type: string;
  topimg_suffix: string;
  link_list: LinkItem[];
}

export interface LinksAPIResponse {
  links: LinkCategory[];
}

export function getLinksData(): LinksAPIResponse {
  const ymlPath = findLinksYml();
  const fileContent = readFileSync(ymlPath, 'utf-8');
  const data = parse(fileContent) as LinkCategory[];
  return { links: data };
}
