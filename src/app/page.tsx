"use client"

import { PROJECT_STATUSES, projectSchema } from '@/schemas/project'
import z from "zod"
import { createProject } from "@/actions/project"
import { toast, Toaster } from "sonner"
import { XIcon } from "lucide-react"
import {
  Field, FieldContent, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend,
  FieldSeparator, FieldSet
} from "@/components/ui/field"

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { SelectItem } from "@/components/ui/select"
import { FormCheckbox, FormInput, FormSelect, FormTextArea } from "@/components/form"
import { useForm } from '@tanstack/react-form'



type FormData = z.infer<typeof projectSchema>
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
    } satisfies FormData as FormData,
    validators: {
      onSubmit: projectSchema
    },
    onSubmit: async ({ value }) => {
      const res = await createProject(value)
      if (res.success) {
        form.reset()
        toast.success("Project created Succesfully!", {
          description: JSON.stringify(value, null, 2),
          className: "whitespace-pre-wrap font-mono"
        })

      } else {
        toast.error("failed to create project")
      }
    }
  })

  return (
    <div className="container px-4 mx-auto my-6 ">
      <Toaster />
      <form onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}>
        <FieldGroup>
          <form.Field name='name'>
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={e => field.handleChange(e.target.value)} aria-invalid={isInvalid} />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}

              </Field>
            }}
          </form.Field>
          <FormSelect control={form.control}
            name="status" label="status">
            {PROJECT_STATUSES.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </FormSelect>

          <FormTextArea name="description" control={form.control} label="Description" description="Be specific as possible" />

          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>Select how you would like to recieve notifications</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <FormCheckbox control={form.control} label="Email" name="notification.email" />
              <FormCheckbox control={form.control} label="Text" name="notification.sms" />
              <FormCheckbox control={form.control} label="InApp" name="notification.push" />
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