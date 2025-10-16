import React from 'react'
interface PageProps{
  params:Promise<{
    credentialId : string
  }>
}


const Page =async  ({params}:PageProps) => {
  
  const {credentialId} = await params;
  return (
    <div>
      credentialsid
      <p>{credentialId}</p>
    </div>
  )
}

export default Page
