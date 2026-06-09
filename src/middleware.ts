import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const corsEnabled = process.env.CORS === 'true' || process.env.CORS === '1';
  
  if (corsEnabled) {
    const corsAllowed = process.env.CORS_ALLOWED || '';
    const allowedOrigins = corsAllowed.split(',').map(s => s.trim()).filter(Boolean);
    const origin = context.request.headers.get('origin') || '';
    
    const isOptions = context.request.method === 'OPTIONS';
    if (isOptions) {
      const allowOrigin = allowedOrigins.length === 0 || allowedOrigins.includes('*') ? '*' : (allowedOrigins.includes(origin) ? origin : '');
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowOrigin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    
    const response = await next();
    
    if (allowedOrigins.length === 0 || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes('*') ? '*' : origin || '*');
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  }
  
  return next();
});
