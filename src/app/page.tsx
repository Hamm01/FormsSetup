"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PROJECT_STATUSES, projectSchema } from '@/schemas/project'
import z from "zod"
import { createProject } from "@/actions/project"
import { toast, Toaster } from "sonner"
import { Divide } from "lucide-react"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
export default function Home() {

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "draft" as const,
      notification: {
        email: false,
        sms: false,
        push: false,
      },
    },
    resolver: zodResolver(projectSchema)

  })
  async function onSubmit(data: z.infer<typeof projectSchema>) {
    const res = await createProject(data)
    console.log(data)
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
      <Toaster />
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
          <Controller
            control={form.control}
            name="status" render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid} onBlur={onBlur} id={field.name}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUSES.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>)} />
          <Controller
            control={form.control}
            name="description" render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription>Be specific as possible</FieldDescription>

                </FieldContent>
                <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>)} />
          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>Select how you would like to recieve notifications</FieldDescription>
            </FieldContent>
          </FieldSet>
          <FieldGroup data-slot="checkbox-group">
            <Controller
              control={form.control}
              name="notification.email" render={({ field: { value, onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} orientation="horizontal">

                  <Checkbox {...field} id={field.name} checked={value} onCheckedChange={onChange} aria-invalid={fieldState.invalid} />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )} </FieldContent>


                </Field>)} />
            <Controller
              control={form.control}
              name="notification.sms" render={({ field: { value, onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} orientation="horizontal">

                  <Checkbox {...field} id={field.name} checked={value} onCheckedChange={onChange} aria-invalid={fieldState.invalid} />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Sms</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )} </FieldContent>


                </Field>)} />
            <Controller
              control={form.control}
              name="notification.push" render={({ field: { value, onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} orientation="horizontal">

                  <Checkbox {...field} id={field.name} checked={value} onCheckedChange={onChange} aria-invalid={fieldState.invalid} />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>In App</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )} </FieldContent>


                </Field>)} />
          </FieldGroup>
          <Button>Create</Button>
        </FieldGroup>
      </form>
    </div>
  )
}      