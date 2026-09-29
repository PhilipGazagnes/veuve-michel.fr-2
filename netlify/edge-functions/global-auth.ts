// Protège tout le site par authentification HTTP Basique (équivalent .htaccess pour Netlify).
// Optionnelle : active seulement si GLOBAL_USER et GLOBAL_PASSWORD sont définies dans
// Site settings → Environment variables. Sinon, le site reste public.
// /help est exclu : il a sa propre protection (help-auth.ts), et deux protections Basic
// sur la même URL feraient boucler le navigateur entre les deux demandes d'identifiants.
export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const user = Netlify.env.get('GLOBAL_USER')
  const password = Netlify.env.get('GLOBAL_PASSWORD')

  if (!user || !password) {
    return context.next()
  }

  const expected = `Basic ${btoa(`${user}:${password}`)}`
  const authHeader = request.headers.get('authorization')

  if (authHeader !== expected) {
    return new Response('Authentification requise', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Accès restreint"' },
    })
  }

  return context.next()
}

export const config = { path: '/*', excludedPath: ['/help', '/help/*'] }
