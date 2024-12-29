import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { ReactNode } from "react";

type FormControlProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues> = {
    name: TName,
    label: ReactNode
    control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"]
}

type FormBaseProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues> =
    FormControlProps<TFieldValues, TName, TTransformedValues> & {
        children: (field: Parameters<ControllerProps<TFieldValues, TName, TTransformedValues>["render"]>[0]["field"] & {
            "aria-invalid": boolean,
            id: string
        }) => ReactNode
    }
function FormBase<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues>({ children, control, label, name }: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
    return (
        <Controller
            control={control}
            name={name} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    {children({ ...field, id: field.name, "aria-invalid": fieldState.invalid })}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>)} />
    )
}


export function FormInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues>(props: FormControlProps<TFieldValues, TName, TTransformedValues>) {

    return (
        <FormBase {...props}>
            {field => <Input {...field} />}
        </FormBase>
    )
}