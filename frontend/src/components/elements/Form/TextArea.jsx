function TextArea({ data }) {

    let {
        name,
        label,
        saveValue = () => { }
    } = data;

    return (
        <div className="form-floating mb-3">
            <textarea
                className="form-control"
                id={name}
                onChange={(e) => { saveValue(e.target.value) }}
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
}

export default TextArea;