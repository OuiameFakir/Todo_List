import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CardHandle from './CardHandle';
import { useTaskContext } from '../hooks/TaskContext';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { task, filterTasks } = useTaskContext();
  const [createModal, setCreateModal] = useState<boolean>(false);

  return (
    <div>
      <Navbar sticky="top" className="navbar-light bg-light justify-content-between align-items-baseline" navbar>
        <Nav>
          <NavbarBrand className='text-uppercase text-secondary font-bold'>
            Doit<span className='text-danger'>Now</span>
          </NavbarBrand>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              Filter Tasks
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem onClick={() => filterTasks('All')}>All</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => filterTasks('High')}>High Priority Tasks</DropdownItem>
              <DropdownItem onClick={() => filterTasks('Medium')}>Medium Priority Tasks</DropdownItem>
              <DropdownItem onClick={() => filterTasks('Low')}>Lowest Priority Tasks</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavLink><Link to='/api-todos' className='text-decoration-none'>Todos</Link></NavLink>
        </Nav>
        <Nav className="mx-3">
          <NavItem>
            <NavLink onClick={() => setCreateModal(true)}>
              <FontAwesomeIcon icon={faPlus} />
              <span className='font-bolder'> New</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>

      <CardHandle isModal={createModal} handleToggle={() => setCreateModal(false)} taskObj={task} isCreated={true} isEdited={false} />
    </div>
  );
}

export default NavBar;
