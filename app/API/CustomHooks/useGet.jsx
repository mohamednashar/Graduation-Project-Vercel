async function getData(link) {
  const API =process.env.NEXT_PUBLIC_BACKEND_API

  const res = await fetch(`${API}${link}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    console.log(res.json())
  }
 
  return res.json()
}

export default getData