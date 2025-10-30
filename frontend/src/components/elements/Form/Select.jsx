function Select({ data, children }) {

    const { name, label, handleChange } = data;
    const options = children.split(" ");

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <br />
            <select className="form-select form-select-lg mb-3" aria-label="Large select example" name={name} id={name} onChange={(e) => {
                handleChange(e.target.value);
            }}>
                {options.map(option =>
                    <option value={option} key={option}>{option}</option>
                )}
            </select>
        </div>
    );
}

export default Select;