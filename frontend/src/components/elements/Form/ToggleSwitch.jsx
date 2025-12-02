import "../../../assets/styles/toggleSwitch.css"

function ToggleSwitch({ data }) {

    let {
        label1,
        label2,
        saveValue = () => { }
    } = data;

    return (
        <div className="mb-3">
            <p className="span">{label1}</p>
            <input type="checkbox" id="switch" onChange={(e) => saveValue(e.target.checked)}/>
            <label className="switch" htmlFor="switch">Toggle</label>
            <p className="span">{label2}</p>
        </div>
    )
}

export default ToggleSwitch;