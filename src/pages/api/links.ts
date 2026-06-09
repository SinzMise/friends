import type { APIRoute } from 'astro';
import { getLinksData } from '../../utils/links';

export const GET: APIRoute = () => {
  const data = getLinksData();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
