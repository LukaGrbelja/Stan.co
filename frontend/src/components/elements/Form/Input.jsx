function Input({ data }) {

    let {
        name,
        label,
        type,
        placeholder = "",
        required = true,
        minlength = 4,
        saveValue = () => { }
    } = data;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                className="form-control"
                placeholder={placeholder}
                minLength={minlength}
                autoComplete="on"
                {...(required ? { required: true } : {})}
                onChange={(e) => { saveValue(e.target.value) }}
            />
        </div>
    );
}

export default Input;