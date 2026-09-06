export default defineNuxtPlugin(() => {
  const { restoreStoredLocale } = useLocale()
  restoreStoredLocale()
})
