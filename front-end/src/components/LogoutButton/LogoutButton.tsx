import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/actions/users";
import './LogoutButton.scss';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <i className="lock icon"></i>
      Logout
    </button>
  );
};

export default LogoutButton;
