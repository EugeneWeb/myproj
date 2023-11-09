import s from "./FormControls.module.css";

const FormControls = ({ input, meta:{touched, error}, className, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControls}>
            {hasError && <p className={s.text}>{error}</p>}
            <props.elementtype {...input}
                {...props}
                className={`${className} ${hasError && s.error} ${s.element}`} />
        </div>
    );
};

export const Input = (props) => {
    return <FormControls {...props}/>
};
export const Textarea = (props) => {
    return <FormControls {...props}/>
};