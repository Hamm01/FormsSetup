"use client"

import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PROJECT_STATUSES, projectSchema } from '@/schemas/project'
import z from "zod"
import { createProject } from "@/actions/project"
import { toast, Toaster } from "sonner"
import { Divide, XIcon } from "lucide-react"
import {
  Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend,
  FieldSeparator, FieldSet
} from "@/components/ui/field"
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
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { FormInput, FormTextArea } from "@/components/form"
export default function Home() {

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "draft" as const,
      notification: {
        email: false,
        push: false,
        sms: false,
      },
      users: [{ email: "" }],
    },
    resolver: zodResolver(projectSchema)
  })

  const { fields: users, append: addUser, remove: removeUser } = useFieldArray({ control: form.control, name: 'users' })
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

          <FormInput control={form.control} name="name" label="Name" />

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
          <FormTextArea name="description" control={form.control} label="Description" description="Be specific as possible" />
          <Controller
            control={form.control}
            name="description" render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription >Be specific as possible</FieldDescription>

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
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <div className="flex justify-between gap-2 items-center">
              <FieldContent>
                <FieldLegend variant="label" className="mb-0">User Email Addresses</FieldLegend>
                <FieldDescription>
                  Add up yo 5 users to this project (including yourself)
                </FieldDescription>
                {form.formState.errors.users?.root && (
                  <FieldError errors={[form.formState.errors.users?.root]} />
                )}
              </FieldContent>
              <Button type="button" variant="outline" size="sm" onClick={() => addUser({ email: "" })}>Add user</Button>
            </div>
            <FieldGroup>
              {users.map((user, index) => (
                <Controller
                  control={form.control}
                  key={user.id}
                  name={`users.${index}.email`} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <InputGroup>
                        <InputGroupInput {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          aria-label={`User ${index + 1} email`} />

                        <InputGroupAddon align="inline-end">
                          <InputGroupButton type="button" variant="ghost" size="icon-xs" onClick={() => removeUser(index)} aria-label={`Remove User ${index + 1}`}><XIcon /></InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>)} />
              ))}
            </FieldGroup>
          </FieldSet>
          <Button>Create</Button>
        </FieldGroup>
      </form>
    </div>
  )
}      