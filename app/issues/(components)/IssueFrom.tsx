"use client"
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchema'
import { z } from 'zod'
import { Issue } from '@prisma/client'

type IssueFormData = z.infer<typeof issueSchema>

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })
  const [error, setError] = useState("")

  return (
    <div>
      {error && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="p-6 bg-gray-700 min-h-screen text-gray-900 flex flex-col gap-4 items-center"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (issue) {
              // If issue exists, update it (PATCH request)
              await axios.patch(`/api/issues/${issue.id}`, data)
            } else {
              // If issue doesn't exist, create a new one (POST request)
              await axios.post('/api/issues', data)
            }

            router.push('/issues')
            router.refresh()
          } catch (error) {
            console.log(error)
            setError("An unexpected error occurred")
          }
        })}
      >

        <div className="w-[90%] max-w-md flex flex-col gap-4">
          <TextField.Root
            defaultValue={issue?.title} // Prefill if editing
            className="w-full bg-white text-gray-900 border border-gray-400 rounded-md p-2"
            {...register("title")}
            placeholder="Title"
          />
          {errors.title && <Text color='red' as='p' className='bg-gray-300 rounded-md'>{errors.title.message}</Text>}

          {/* Markdown editor for issue description */}
          <div className='bg-white rounded-md'>
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description} // Prefill if editing
              render={({ field }) => <SimpleMDE {...field} />}
            />
            {errors.description && <Text color='red'>{errors.description.message}</Text>}
          </div>

          <Button className="bg-purple-600 text-white px-3 py-2 rounded-md cursor-pointer">
            {issue ? "Update Issue" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default IssueForm
