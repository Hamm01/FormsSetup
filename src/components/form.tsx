import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { ReactNode } from "react";
import { Textarea } from "./ui/textarea";

import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

type FormControlProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues> = {
    name: TName,
    label: ReactNode
    description?: ReactNode
    control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"]
}

type FormBaseProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues> =
    FormControlProps<TFieldValues, TName, TTransformedValues> & {
        children: (field: Parameters<ControllerProps<TFieldValues, TName, TTransformedValues>["render"]>[0]["field"] & {
            "aria-invalid": boolean,
            id: string
        }) => ReactNode
    }

type FormControlFunc = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues>(props: FormControlProps<TFieldValues, TName, TTransformedValues>) => ReactNode

function FormBase<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues>({ children, control, label, name, description }: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
    return (
        <Controller
            control={control}
            name={name} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                        {description &&
                            <FieldDescription >{description}</FieldDescription>
                        }
                    </FieldContent>
                    {children({ ...field, id: field.name, "aria-invalid": fieldState.invalid })}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>)} />
    )
}

export const FormInput: FormControlFunc = (props) => {
    return <FormBase {...props}>
        {field => <Input {...field} />}
    </FormBase>
}

export const FormTextArea: FormControlFunc = (props) => {
    return <FormBase {...props}>
        {field => <Textarea {...field} />}
    </FormBase>
}



