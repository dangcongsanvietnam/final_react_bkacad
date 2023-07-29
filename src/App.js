import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import TodoList from './components/TodoList';
import Record from './components/Record';
import EmployeeList from './components/EmployeeList';
import NewEmployeeList from './components/NewEmployeeList';
import AddNewEmployee from './components/AddNewEmployee';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Container className='border bg-secondary'>
          <Nav className='mx-auto'>
            <NavLink to="/" className='p-2 text-decoration-none text-white border border-secondary border-2'>Register Form</NavLink>
            <NavLink to="/todo" className='p-2 text-decoration-none text-white border border-secondary border-2'>Todo List</NavLink>
            <NavLink to="/record" className='p-2 text-decoration-none text-white border border-secondary border-2'>Record Table</NavLink>
            <NavLink to="/empl" className='p-2 text-decoration-none text-white border border-secondary border-2'>Employee List</NavLink>
            <NavLink to="/newempl" className='p-2 text-decoration-none text-white border border-secondary border-2'>New Employee List</NavLink>
            <NavLink to="/newempl/newm/new" className='p-2 text-decoration-none text-white border border-secondary border-2'>Add New Employee</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={ <Register /> }></Route>
        <Route path="/todo" element={ <TodoList /> }></Route>
        <Route path="/record" element={ <Record /> }></Route>
        <Route path="/empl" element={ <EmployeeList /> }></Route>
        <Route path="/newempl" element={ <NewEmployeeList /> }></Route>
        <Route path="/newempl/newm/new" element={ <AddNewEmployee /> }></Route>
        <Route path="/newempl/newm/new/:id" element={ <AddNewEmployee /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
