import React from 'react'
import IssueForm from '../../(components)/IssueFrom'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params: {id: string}
}

const EditIssuePage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id) // parseInt  to convert string to number
        }
    })

    if(!issue){
        notFound()
    }
  return (

    <IssueForm issue={issue}/>
  )
}

export default EditIssuePage
