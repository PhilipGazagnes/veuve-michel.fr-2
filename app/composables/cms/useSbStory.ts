// Thin wrapper around the Storyblok CDN API for single stories and
// starts_with-filtered collections. Uses draft content in dev (so unpublished
// edits show immediately) and published content in production builds.

export function useSbStory<T = Record<string, any>>(slug: string, key?: string) {
  const api = useStoryblokApi()
  return useAsyncData<T>(key ?? `sb-story-${slug}`, async () => {
    const { data } = await api.get(`cdn/stories/${slug}`, {
      version: import.meta.dev ? 'draft' : 'published',
    })
    return data.story.content as T
  })
}

export function useSbStories<T = Record<string, any>>(startsWith: string, key?: string) {
  const api = useStoryblokApi()
  return useAsyncData<T[]>(key ?? `sb-stories-${startsWith}`, async () => {
    const stories = await api.getAll('cdn/stories', {
      starts_with: startsWith,
      version: import.meta.dev ? 'draft' : 'published',
    })
    return stories.map((s: any) => s.content as T)
  })
}

export function splitParagraphs(text?: string): string[] {
  return (text ?? '').split(/\n\s*\n/).filter(Boolean)
}

export function splitLines(text?: string): string[] {
  return (text ?? '').split('\n').map((l) => l.trim()).filter(Boolean)
}

export function splitCsv(text?: string): string[] {
  return (text ?? '').split(',').map((l) => l.trim()).filter(Boolean)
}
