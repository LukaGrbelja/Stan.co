function Range({ data }) {

    let {
        name,
        label,
        max = 100,
        currentValue = 100,
        saveValue = () => { }
    } = data;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="me-3">
                {label}
            </label>
            <input
                type="range"
                id={name}
                name={name}
                max={max}
                defaultValue={currentValue}
                step="1"
                onChange={(e) => {saveValue(e.target.value)}}
            />
            {currentValue}
        </div>
    );
}

export default Range;