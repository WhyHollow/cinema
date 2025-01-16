export function decodeHtmlEntities(encodedString: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(encodedString, 'text/html')
  return doc.documentElement.textContent || ''
}
