import React from 'react'
import Student from './Student'
import Prof from './Prof'

function page({params}) {
  return (
    <div>
      {/* <Student params={params}/> */}
      <Prof params={params}/>
    </div>
  )
}

export default page