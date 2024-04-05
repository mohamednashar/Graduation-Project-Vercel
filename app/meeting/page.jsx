import React from 'react'

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/12')
  if(!res.ok)
  {
    throw new Error("Failed")
  }
 
  return res.json()

}

export default async function page() {
  const data = await getData()
  console.log(data)
  return (
    <div>
      {data.title}
      
    </div>
  )
}
