// Protège /aide par authentification HTTP Basique (équivalent .htaccess pour Netlify).
// Identifiants à définir dans Site settings → Environment variables : AIDE_USER, AIDE_PASSWORD.
export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const user = Netlify.env.get('AIDE_USER')
  const password = Netlify.env.get('AIDE_PASSWORD')

  if (!user || !password) {
    return new Response(
      'Protection non configurée : variables AIDE_USER / AIDE_PASSWORD manquantes sur Netlify.',
      { status: 500 },
    )
  }

  const expected = `Basic ${btoa(`${user}:${password}`)}`
  const authHeader = request.headers.get('authorization')

  if (authHeader !== expected) {
    return new Response('Authentification requise', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Espace propriétaire"' },
    })
  }

  return context.next()
}

export const config = { path: ['/aide', '/aide/*'] }
