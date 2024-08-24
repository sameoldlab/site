export const getCollection = async <T>(collectionFiles: Record<string, () => Promise<T>>) => {
  const collectionArr = Object.entries(collectionFiles)

  const collection = await Promise.all(
    collectionArr.map(async ([path, resolver]) => {
      const module = await resolver()
      const collectionPath = path

      return {
        ...module,
        path: collectionPath
      }
    })
  )
  return collection
}
