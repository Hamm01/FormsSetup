"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from '@/schemas/project'
import z from "zod"
import { createProject } from "@/actions/project"
import { toast } from "sonner"
import { Divide } from "lucide-react"
export default function Home() {

  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      name: ""
    },
    resolver: zodResolver(projectSchema)

  })
  async function onSubmit(data: z.infer<typeof projectSchema>) {
    const res = await createProject(data)
    if (res.success) {
      form.reset()
      toast.success("Project created Succesfully!", {
        description: JSON.stringify(data, null, 2),
        className: "whitespace-pre-wrap font-mono"
      })

    } else {
      toast.error("failed to create project")
    }
  }

  return (
    <div className="container px-4 mx-auto my-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>

      </form>
    </div>
  )
}      