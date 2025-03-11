import { Layout, Button } from 'antd';
import 'antd/dist/reset.css';
import './Navbar.css';

const { Header } = Layout;

type Props = {
  createForm: () => void
}

const Navbar = ({createForm}: Props) => {
  return (
    <Header className="navbar-header">
      <div className="navbar-content">
        <div className="logo">
          To Do App
        </div>

        <Button className="add-task-button" onClick={createForm}>
          Add Task
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
