import { useNavigate } from "react-router-dom";
import './AddTaskButton.scss';

const AddTaskButton = () => {
  const navigate = useNavigate();

  const addTodo = () => {
    navigate("/myToDoList/addToDo");
  }

  return (
    <div id="addTask">
      <button className="ui teal button" onClick={addTodo} type="button">
        + Add task
      </button>
    </div>
  );
};

export default AddTaskButton;
