export const formatUsername = (name: string) => {
  if (name.trim() === "") return "USER"
  const dividedName = name.split(" ")
  const firstName = dividedName[0]
  if (dividedName.length === 1) {
    console.log("length of 1")
    return firstName.slice(0, 2).toString().toUpperCase()
  } else {
    const secondName = dividedName[1]
    const shortName = firstName[0] + secondName[0]
    return shortName
  }
}
