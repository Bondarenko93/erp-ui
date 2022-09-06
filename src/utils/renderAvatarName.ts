export const renderName = (name: string | undefined) => {
  if (name) {
    const firstName = name.split(' ')[0][0]
    const lastName = name.split(' ')[1][0]
    return `${firstName}${lastName || ''}`
  }
}
