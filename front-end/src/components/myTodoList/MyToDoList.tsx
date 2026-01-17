import { useDispatch, useSelector } from "react-redux";
import Todo, { TodoMode } from "../Todo/Todo";
import { Outlet, useNavigate } from "react-router-dom";
import { AppStateDto } from "../../dtos/state.dto";
import { useEffect } from "react";
import { getAllTasks } from "../../store/actions/MyToDoList";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  Table,
  Icon,
} from 'semantic-ui-react'
import './MyToDoList.scss';

interface MyToDoListProps {
  showCompleted: boolean;
}

const MyToDoList = ({ showCompleted }: MyToDoListProps) => {
  let currentUser = useSelector((state: AppStateDto) => state.currentUser);
  let myToDoList = useSelector((state: AppStateDto) => state.myToDoList);
  let searchWord = useSelector((state: AppStateDto) => state.searchWord);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(getAllTasks(currentUser?.uid ?? null));
    }
  }, [currentUser, dispatch, navigate]);

  const filteredTasks = myToDoList?.filter((todo) => 
    todo.isCompleted === showCompleted && 
    todo.title.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <div className="todo-list-section">
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {showCompleted ? 'Tasks done' : 'Tasks to do'}
          <Icon name="angle down" style={{ fontSize: '18px', color: '#666' }} />
        </h2>
        
        <div>
          <Table compact>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <Icon name="square outline" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="align left" /> Task name
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="calendar outline" /> Due date
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="tag" /> Tag
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="sticky note outline" /> Note
                </TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTasks.map((todo) => {
                return <Todo key={todo.uid} item={todo} mode={TodoMode.READ} />;
              })}
              {!showCompleted && <Outlet />}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyToDoList;
