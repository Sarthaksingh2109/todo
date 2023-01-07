import { Dropdown, DropdownButton } from 'react-bootstrap'
function DropDown({ desc }) {
    return (
        <DropdownButton id="dropdown-basic-button" title="Description">
            <Dropdown.Item href="#/action-1">{desc}</Dropdown.Item>
        </DropdownButton>
    );
}
export default DropDown;