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
import { useAppForm } from '@/components/form/hooks'



type FormData = z.infer<typeof projectSchema>
export default function Home() {

  const form = useAppForm({
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
          <form.AppField name='name'>
            {field => <field.Input label='Name' />}
          </form.AppField>
          <form.AppField name='status'>
            {field => <field.Select label='status' >
              {PROJECT_STATUSES.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </field.Select>}
          </form.AppField>
          <form.AppField name='description'>
            {field => <field.Textarea label='description' description='Be specific as possible' />}
          </form.AppField>
          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>Select how you would like to recieve notifications</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <form.AppField name='notification.email'>
                {field => <field.CheckBox label='Email' />}
              </form.AppField>
              <form.AppField name='notification.sms'>
                {field => <field.CheckBox label='Text' />}
              </form.AppField>
              <form.AppField name='notification.push'>
                {field => <field.CheckBox label='In App' />}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <form.AppField name="users" mode='array'>
            {field => {
              return (<FieldSet>
                <div className="flex justify-between gap-2 items-center">
                  <FieldContent>
                    <FieldLegend variant="label" className="mb-0">User Email Addresses</FieldLegend>
                    <FieldDescription>
                      Add up yo 5 users to this project (including yourself)
                    </FieldDescription>
                    {field.state.meta.errors && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Button type="button" variant="outline" size="sm" onClick={() => field.pushValue({ email: "" })}>Add user</Button>
                </div>
                <FieldGroup>
                  {field.state.value.map((_, index) => (
                    <form.AppField
                      key={index}
                      name={`users[${index}].email`}>
                      {innerField => {
                        const inInvalid = innerField.state.meta.isTouched && !!innerField.state.meta.isValid
                        return (<Field data-invalid={inInvalid}>
                          <InputGroup>
                            <InputGroupInput
                              id={field.name}
                              aria-invalid={inInvalid}
                              aria-label={`User ${index + 1} email`}
                              onBlur={innerField.handleBlur}
                              onChange={e => innerField.handleChange(e.target.value)}
                              value={innerField.state.value}
                            />

                            <InputGroupAddon align="inline-end">
                              <InputGroupButton type="button" variant="ghost" size="icon-xs" onClick={() => field.removeValue(index)} aria-label={`Remove User ${index + 1}`}><XIcon /></InputGroupButton>
                            </InputGroupAddon>
                          </InputGroup>
                          {inInvalid && (
                            <FieldError errors={innerField.state.meta.errors} />
                          )}
                        </Field>)
                      }}
                    </form.AppField>
                  ))}
                </FieldGroup>
              </FieldSet>)
            }}
          </form.AppField>
          <Button>Create</Button>
        </FieldGroup>
      </form>
    </div>
  )
}      