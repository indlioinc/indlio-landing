export function useBrandLogos() {
  function resolve(file: string) {
    if (!file || file.startsWith('http') || file.startsWith('/')) {
      return file
    }

    return `/logos/${file}`
  }

  return { resolve }
}
