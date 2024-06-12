"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import TableAssignments from '../[assignment]/TableAssignment'
function Show() {
  const searchParams = useSearchParams()
 
  const AssignmentName = searchParams.get('name')
  const AssignmentId = searchParams.get('id')
  return (
    <div>
    <TableAssignments/>
    </div>
  )
}

export default Show