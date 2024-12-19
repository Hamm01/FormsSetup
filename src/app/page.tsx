"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from '@/schemas/project'
import z from "zod"
import { createProject } from "@/actions/project"
import { toast } from "sonner"
import { Divide } from "lucide-react"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function Home() {

  const form = useForm({
    defaultValues: {
      name: "",
      description: ""
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
    <div className="container px-4 mx-auto my-6 ">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name" render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>)} />
          <Button>Create</Button>
        </FieldGroup>
      </form>
    </div>
  )
}      