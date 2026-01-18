import React, { useState, useRef, useEffect } from 'react';
import './Todo.scss';
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask, addTask, getAllPriorities } from '../../store/actions/todoList';
import { TableCell, TableRow, Icon } from 'semantic-ui-react';
import { getPriorityConfig } from '../../utils/priorities';
import { formatDateForMobile } from '../../utils/dateFormatter';
import { getCurrentWeather } from '../../services/weatherService';
import { AppStateDto } from '../../dtos/state.dto';
import { useNavigate } from 'react-router-dom';
import { TodoMode, TodoProps } from './types';

const Todo: React.FC<TodoProps> = ({ item, mode = TodoMode.READ }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: AppStateDto) => state.currentUser);
  const priorities = useSelector((state: AppStateDto) => state.priorities);

  const priorityConfig = getPriorityConfig(item?.priorityName);
  const [isEditing, setIsEditing] = useState(mode === TodoMode.UPDATE);
  const [selectedPriority, setSelectedPriority] = useState<string>(item?.priorityUid || '');

  const [weather, setWeather] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const title = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

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
      dispatch(getAllPriorities(currentUser?.uid));
    }
  }, [dispatch, priorities.length, currentUser?.uid]);

  const handleDelete = () => {
    if (item && window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(item.uid ?? null, currentUser?.uid));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (mode === TodoMode.CREATE) {
      const titleValue = title.current?.value?.trim();
      
      if (!titleValue) {
        alert('Title is required');
        return;
      }
      
      const newTask = {
        title: titleValue,
        dueDate: dueDate.current?.value ? new Date(dueDate.current.value) : new Date(),
        isCompleted: false,
        priorityUid: selectedPriority || undefined,
        userUid: currentUser?.uid,
      };
      dispatch(addTask(newTask));
      navigate("/myTodoList");
    } else if (item) {
      const updatedTask = {
        ...item,
        title: title.current?.value || item.title,
        dueDate: new Date(dueDate.current?.value || item.dueDate),
        priorityUid: selectedPriority || item.priorityUid
      };
      dispatch(updateTask(updatedTask));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (mode === TodoMode.CREATE) {
      navigate("/myTodoList");
    } else {
      setIsEditing(false);
    }
  };

  const handleToggleComplete = () => {
    if (item) {
      dispatch(updateTask({ ...item, isCompleted: !item.isCompleted }));
    }
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
            ref={title}
            defaultValue={item?.title || ''}
            type="text"
            placeholder="Write a task here..."
            className="todo-title-input"
          />
        ) : (
          item?.title
        )}
      </TableCell>
      <TableCell className="mobile-date">
        {isEditMode ? (
          <input
            ref={dueDate}
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
            className="priority-select ui dropdown"
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
              className="priority-badge"
              style={{
                backgroundColor: priorityConfig.backgroundColor,
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
          <div className="action-buttons">
            <Icon name="check" link color="green" onClick={handleSave} title="Save" />
            <Icon name="close" link color="red" onClick={handleCancel} title="Cancel" />
          </div>
        ) : (
          !item?.isCompleted && (
            <div className="action-buttons">
              <Icon name="pencil" link color="blue" onClick={handleEdit} title="Edit" />
              <Icon name="trash" link color="red" onClick={handleDelete} title="Delete" />
            </div>
          )
        )}
      </TableCell>
    </TableRow>
  );
};

export default Todo;
