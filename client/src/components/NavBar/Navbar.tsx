import { Layout, Button } from 'antd';
import 'antd/dist/reset.css';
import './Navbar.css';
import taskStore from '../../stores/TasksStore';
import StatusFilter from './StatusFilter';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="navbar-header">
      <div className="navbar-content">
        <div className="logo">
          To Do App
        </div>
        <StatusFilter />
        <Button className="add-task-button" onClick={() => taskStore.selectCreateAction()}>
          Add Task
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
