import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { roleFlagAtom } from '../../recoil/atom/UserAtom';

const Login = () => {
  const [roleFlag, setRoleFlag] = useRecoilState(roleFlagAtom);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email : '',
    password : ''
  })

  const onChangeForm = (e) => {
    setLoginForm(prev => ({...prev, [e.target.name] : e.target.value}));
  }

  const LoginProcess =  async (e) => {
    e.preventDefault();
    const response =  await fetch('http://localhost:8080/login', {
      method : 'POST',
      credentials : 'include',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(loginForm),
    })

    if (response.status === 200) {
      const Authorization = response.headers.get('Authorization')
      localStorage.setItem('Authorization', Authorization)
      alert('로그인 성공')
      setRoleFlag(!roleFlag)
      navigate("/");
    } else {
      alert('아이디, 비밀번호가 일치하지 않습니다')
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <input
          type={'text'}
          name={'email'}
          value={loginForm.email} 
          onChange={onChangeForm}
          
        />
        <br />
        <input
          type={'password'}
          name={'password'}
          value={loginForm.password}
          onChange={onChangeForm}
        />
        <br />
        <button onClick={LoginProcess}>로그인</button>
        <button onClick={(e) => navigate('/')}>메인</button>
      </form>
    </div>
  )
}

export default Login;