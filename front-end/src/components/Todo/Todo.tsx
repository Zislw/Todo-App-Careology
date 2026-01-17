import React, { useState, useRef, useEffect } from 'react';
import './Todo.scss';
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask, addTask, getAllPriorities } from '../../store/actions/MyToDoList';
import { TableCell, TableRow, Icon } from 'semantic-ui-react';
import { ToDoDto } from '../../dtos/todo.dto';
import { getPriorityConfig } from '../../utils/priorityHelper';
import { getCurrentWeather } from '../../utils/weatherService';
import { AppStateDto } from '../../dtos/state.dto';
import { useNavigate } from 'react-router-dom';

export enum TodoMode {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update'
}

interface TodoProps {
  item?: ToDoDto;
  mode?: TodoMode;
}

const Todo: React.FC<TodoProps> = ({ item, mode = TodoMode.READ }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: AppStateDto) => state.currentUser);
  const priorities = useSelector((state: AppStateDto) => state.priorities);
    
  const priorityConfig = item ? getPriorityConfig(item.priorityName) : getPriorityConfig();
  const [isEditing, setIsEditing] = useState(mode === TodoMode.UPDATE);
  const [selectedPriority, setSelectedPriority] = useState<string>(item?.priorityUid || '');

  const [weather, setWeather] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === TodoMode.READ && item?.title) {
      const fetchWeather = async () => {
        setLoading(true);
        const temp = await getCurrentWeather(item.title);
        setWeather(temp || '');
        setLoading(false);
      };
      fetchWeather();
    }
  }, [item?.title, mode]);

  useEffect(() => {
    if (priorities.length === 0) {
      dispatch(getAllPriorities());
    }
  }, [dispatch, priorities.length]);

  const handleDelete = () => {
    if (item && window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(item.uid));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (mode === TodoMode.CREATE) {
      const newTask = {
        title: titleRef.current?.value || "",
        dueDate: new Date(dueDateRef.current?.value || ""),
        isCompleted: false,
        priorityUid: selectedPriority,
        userUid: currentUser?.uid,
      };
      dispatch(addTask(newTask));
      navigate("/myToDoList");
    } else if (item) {
      const updatedTask = {
        ...item,
        title: titleRef.current?.value || item.title,
        dueDate: new Date(dueDateRef.current?.value || item.dueDate),
        priorityUid: selectedPriority || item.priorityUid
      };
      dispatch(updateTask(updatedTask));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (mode === TodoMode.CREATE) {
      navigate("/myToDoList");
    } else {
      setIsEditing(false);
    }
  };

  const handleToggleComplete = () => {
    if (item) {
      dispatch(updateTask({ ...item, isCompleted: !item.isCompleted }));
    }
  };

  const formatDateForMobile = (date: Date) => {
    const today = new Date();
    const taskDate = new Date(date);
    
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);
    
    const isToday = today.getTime() === taskDate.getTime();
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[taskDate.getMonth()];
    const day = taskDate.getDate();
    
    if (isToday) {
      return `Today - ${month} ${day}`;
    }
    
    return `${month} ${day}`;
  };

  const isCreateMode = mode === TodoMode.CREATE;
  const isEditMode = isEditing || isCreateMode; 

  return (
    <TableRow>
      <TableCell collapsing>
        <input 
          type="checkbox" 
          checked={item?.isCompleted || false}  
          onChange={handleToggleComplete}
          disabled={isEditMode || isCreateMode}
        />
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <input 
            ref={titleRef} 
            defaultValue={item?.title || ''} 
            type="text"
            placeholder="Write a task here..."
            style={{ 
              width: '100%',
              border: 'none',
              borderBottom: '1px solid #ddd',
              outline: 'none',
              padding: '4px 0',
              fontSize: '14px',
              backgroundColor: 'transparent'
            }}
          />
        ) : (
          item?.title
        )}
      </TableCell>
      <TableCell className="mobile-date">
        {isEditMode ? (
          <input 
            ref={dueDateRef} 
            defaultValue={item ? new Date(item.dueDate).toISOString().split('T')[0] : ''} 
            type="date"
          />
        ) : (
          item && (
            <>
              <span className="desktop-date">{new Date(item.dueDate).toLocaleDateString()}</span>
              <span className="mobile-date-format">{formatDateForMobile(item.dueDate)}</span>
            </>
          )
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="ui dropdown"
            style={{ width: '100%' }}
          >
            <option value="">Select priority...</option>
            {priorities.map(priority => (
              <option key={priority.uid} value={priority.uid}>
                {priority.name}
              </option>
            ))}
          </select>
        ) : (
          !isCreateMode && (
            <span 
              style={{
                backgroundColor: priorityConfig.backgroundColor,
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              {priorityConfig.label}
            </span>
          )
        )}
      </TableCell>
      <TableCell className="mobile-note">
        {mode === TodoMode.READ && (
          loading ? (
            <Icon loading name='spinner' />
          ) : (
            weather
          )
        )}
      </TableCell>
      <TableCell>
        {isEditMode || isCreateMode ? (
          <>
            <Icon name="check" link color="green" onClick={handleSave} title="Save" style={{ marginRight: '10px' }} />
            <Icon name="close" link color="red" onClick={handleCancel} title="Cancel" />
          </>
        ) : (
          !item?.isCompleted && (
            <>
              <Icon name="pencil" link color="blue" onClick={handleEdit} title="Edit" style={{ marginRight: '10px' }} />
              <Icon name="trash" link color="red" onClick={handleDelete} title="Delete" />
            </>
          )
        )}
      </TableCell>
    </TableRow>
  );
};

export default Todo;
