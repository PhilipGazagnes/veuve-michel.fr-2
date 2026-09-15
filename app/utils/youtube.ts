export function toYoutubeEmbedUrl(url?: string): string {
  if (!url) return ''
  if (url.includes('/embed/')) return url

  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`

  return url
}
