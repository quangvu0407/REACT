import NavDropdown from 'react-bootstrap/NavDropdown';

const Language = (props) => {
    return (
        <>
            <NavDropdown title="Việt Nam" id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item >Việt Nam</NavDropdown.Item>
                <NavDropdown.Item >EngLish</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Language;