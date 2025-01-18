import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { useFieldContext } from "./hooks"


export function FormInput() {
    const field = useFieldContext<string>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (<Field data-invalid={isInvalid}>

        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
        <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={e => field.handleChange(e.target.value)} aria-invalid={isInvalid} />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}

    </Field>)

}