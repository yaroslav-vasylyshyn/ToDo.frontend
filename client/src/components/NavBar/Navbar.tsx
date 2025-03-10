import { Layout, Button } from 'antd';
import 'antd/dist/reset.css';
import './Navbar.css';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="navbar-header">
      <div className="navbar-content">
        <div className="logo">
          To Do App
        </div>

        <Button type="primary" className="add-task-button">
          Add Task
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
