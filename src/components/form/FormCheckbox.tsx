import { Checkbox } from "../ui/checkbox"
import { FormBase, FormControlProps } from "./Formbase"
import { useFieldContext } from "./hooks"



export function FormCheckbox(props: FormControlProps) {
    const field = useFieldContext<boolean>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <FormBase {...props} horizontal controlFirst>

            <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onBlur={field.handleBlur}
                onCheckedChange={e => field.handleChange(e === true)}
                aria-invalid={isInvalid} />

        </FormBase>
    )
}