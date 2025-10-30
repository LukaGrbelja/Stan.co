function Form({
        children,
        handleSubmit = () => { },
        classStr = ""
    }) {

    const handleForm = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <form onSubmit={handleForm} className={classStr}>
            {children}
        </form>
    );
}

export default Form;