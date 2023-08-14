const envTimeout = parseInt(process.env.NEXT_PUBLIC_DEFAULT_API_TIMEOUT || '');
const defaultTimeout = Number.isInteger(envTimeout) ? envTimeout : 16000;

function cleanUrl(url: string): string {
  // Replace multiple forward slashes with a single forward slash
  return url.replace(/([^:])(\/\/+)/g, '$1/');
}

async function fetchFromServer(url: string, options: any = undefined) {
  const response = await fetch(cleanUrl(url), {
    ...options,
  });

  return response;
}

async function fetchFromClient(url: string, options: any = undefined) {
  const timeout = Number.isInteger(options?.timeout) ? options.timeout : defaultTimeout;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(cleanUrl(url), {
    ...options,
    signal: controller.signal,
  }).catch((error) => {
    console.log('%c ERRROR FOUND DURING FETCH', 'color:red', error);

    let createNewRes = new Response(JSON.stringify({ error: 'API ERROR' }), { status: 500, statusText: 'ERROR VIA API TIME OUT' });

    return createNewRes;
  });
  clearTimeout(id);

  return response;
}

export { fetchFromServer, fetchFromClient, cleanUrl };
