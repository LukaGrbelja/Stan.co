function HomePage() {
    return (
        <>
            <center>
                <h1>Dobrodošli na Stan.CO</h1>
                <h3 className="m-3 mb-5">Vaša platforma za pronalazak stanova i cimera</h3>
            </center>
            <hr />
            <div className="d-flex align-items-start m-5">
                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Obavijesti</button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Favoriti</button>
                </div>
                <div className="tab-content w-100" id="v-pills-tabContent">
                    <div className="tab-pane fade show active w-100" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                        <ul className="list-group w-100">
                            <li className="list-group-item bg-dark-subtle w-100 border border-primary-subtle">Trenutno nemate obavijesti</li>
                        </ul>
                    </div>
                    <div className="tab-pane fade w-100" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                        <ul className="list-group w-100">
                            <li className="list-group-item bg-dark-subtle w-100 border border-primary-subtle">Niste postavili favorite</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;