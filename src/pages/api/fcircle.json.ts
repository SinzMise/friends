import type { APIRoute } from 'astro';
import { getLinksData } from '../../utils/links';

export const prerender = true;

export const GET: APIRoute = () => {
  const data = getLinksData();
  const friends: string[][] = [];

  for (const category of data.links) {
    for (const item of category.link_list) {
      friends.push([item.name, item.link, item.avatar]);
    }
  }

  return new Response(JSON.stringify({ friends }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
