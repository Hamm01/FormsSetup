import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Input } from "../ui/input";

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: FormInput
    },
    formComponents: {},
    fieldContext,
    formContext
})

export { useAppForm, useFieldContext, useFormContext }