function Input({ data }) {

    let {
        name,
        label,
        type,
        placeholder = "",
        className = "form-control",
        labelClassName = "form-label",
        required = true,
        checked = false,
        minlength = 4,
        saveValue = () => { }
    } = data;

    return (
        <div className="mb-3">
            <label htmlFor={name} className={labelClassName} >
                {label}
            </label>
            <input
                type={type}
                id={name}
                className={className}
                placeholder={placeholder}
                minLength={minlength}
                autoComplete="on"
                {...(required ? { required: true } : {})}
                {...(checked ? { checked: true } : {})}
                onChange={(e) => { saveValue(e.target.value) }}
            />
        </div>
    );
}

export default Input;