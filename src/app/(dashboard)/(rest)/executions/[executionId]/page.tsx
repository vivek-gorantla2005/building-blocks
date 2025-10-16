import React from 'react'
interface PageProps{
  params:Promise<{
    executionId : string
  }>
}


const Page =async  ({params}:PageProps) => {
  
  const {executionId} = await params;
  return (
    <div>
      executionId
      <p>{executionId}</p>
    </div>
  )
}

export default Page
