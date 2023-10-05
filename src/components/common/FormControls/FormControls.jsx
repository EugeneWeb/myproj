import s from "./FormControls.module.css";

// export const Textarea = ({input, meta, ...props}) => {

//     // если элемент тронут и есть ошибка
//     const hasError = meta.touched && meta.error
//   return (
//     <div>
//         {hasError && <p>{meta.error}</p>}
//         <textarea className={hasError && s.error} {...input} {...props}></textarea>
//     </div>
//   )
// }

// const FormControls = ({ input, meta, ...props }) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div>
//             {hasError && <p className={s.text}>{meta.error}</p>}
//             {props.children}
//         </div>
//     );
// };
const FormControls = ({ input, meta, className, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControls}>
            {hasError && <p className={s.text}>{meta.error}</p>}
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


// export const Textarea = (props) => {
//     const { input, meta, className, ...restProps } = props;
//     const hasError = meta.touched && meta.error;
//     return (
//         <FormControls {...props}>
//             <textarea
//                 {...input}
//                 {...restProps}
//                 className={`${className} ${hasError && s.error} ${s.textarea}`}
//             ></textarea>
//         </FormControls>
//     );
// };
// export const Input = (props) => {
//     const { input, meta, className, ...restProps } = props;
//     const hasError = meta.touched && meta.error;
//     return (
//         <FormControls {...props}>
//             <input
//                 {...input}
//                 {...restProps}
//                 className={`${className} ${hasError && s.error}`}
//             />
//         </FormControls>
//     );
// };
