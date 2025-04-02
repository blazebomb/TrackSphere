import Link from 'next/link'
import React from 'react'

const IssueActions = () => {

  // button for the create new issue page
  return (
    <>
      <Link href="/issues/new">
                <div className="w-full bg-gray-900 border border-purple-500 text-white p-4 md:p-6 rounded-lg shadow-lg flex items-center justify-center cursor-pointer mb-4 md:mb-6">
                  <p className="text-base md:text-lg font-semibold">+ Create New Issue</p>
                </div>
      </Link>

    </>

  )
}

export default IssueActions
