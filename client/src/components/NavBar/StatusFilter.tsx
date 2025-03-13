import { observer } from 'mobx-react-lite';
import { Select } from 'antd';
import { useTaskStore } from '../../stores/store';

const { Option } = Select;

const StatusFilter = observer(() => {
    const taskStore = useTaskStore();

    const handleChange = (value: string) => {
        taskStore.setFilterStatus(value);
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <Select
                className='filter-select'
                value={taskStore.selectedStatus}
                style={{ width: 200 }}
                onChange={handleChange}
            >
                <Option value='All'>All</Option>
                <Option value='To Do'>To Do</Option>
                <Option value='In progress'>In Progress</Option>
                <Option value='Done'>Done</Option>
            </Select>
        </div>
    );
});

export default StatusFilter;
