import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { ReactNode } from "react";

type FormControlProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues> = {
    name: TName,
    label: ReactNode
    control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"]
}

export function FormInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues>({ control, name, label }: FormControlProps<TFieldValues, TName, TTransformedValues>) {

    return (
        <Controller
            control={control}
            name={name} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>)} />
    )
}