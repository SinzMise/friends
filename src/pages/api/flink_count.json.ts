import type { APIRoute } from 'astro';
import { getLinksData, type LinkItem } from '../../utils/links';

export const prerender = true;

interface FlinkItem {
  name: string;
  link: string;
  avatar: string;
  descr: string;
  siteshot: string;
}

interface FlinkCountResponse {
  link_list: FlinkItem[];
  length: number;
}

export const GET: APIRoute = () => {
  const data = getLinksData();
  const linkList: FlinkItem[] = [];

  for (const category of data.links) {
    for (const item of category.link_list) {
      linkList.push({
        name: item.name,
        link: item.link,
        avatar: item.avatar,
        descr: item.descr,
        siteshot: item.siteshot || '',
      });
    }
  }

  const response: FlinkCountResponse = {
    link_list: linkList,
    length: linkList.length,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
