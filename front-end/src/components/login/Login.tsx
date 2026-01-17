import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../../store/actions/users";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>({});

  let password = useRef<HTMLInputElement>(null);
  let email = useRef<HTMLInputElement>(null);

  const validate = () => {
    const err: any = {};
    let isValid = true;

    if (!email.current?.value) {
      err.email = { message: "Email is required" };
      isValid = false;
    }

    if (!password.current?.value) {
      err.password = { message: "Password is required" };
      isValid = false;
    }

    setErrors(err);
    return isValid;
  };

  const loginTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    dispatch(
      login(
        {
          password: password.current?.value,
          email: email.current?.value
        },
        navTodo
      )
    );
  };

  const navTodo = (): void => {
    navigate("/myToDoList");
  };

  return (
    <div className="login">
      <form className="ui form">
        <h1>Welcome!</h1>
        <h1>Sign in to</h1>
        <h3>get things done</h3>
        <div className="field">
          <label>Enter your email</label>
          <input placeholder="yours@example.com" ref={email} />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
        </div>
        <div className="field">
          <label>Enter your password</label>
          <input type="password" ref={password} />
          {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}
        </div>
        <button className="ui teal button" onClick={loginTodo} type="submit">
          Login
        </button>
      </form>
      <div>
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
};

export default Login;
