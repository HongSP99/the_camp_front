import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../../components/ResetPassword'; 
import { useAuth } from '../../utils/AuthContext';
import { useSetRecoilState } from 'recoil';
import { roleAtom } from '../../recoil/atom/UserAtom';

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth(); // Get logIn function from context
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const setRole = useSetRecoilState(roleAtom);

  const onChangeForm = (e) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const LoginProcess = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      if (response.ok) {
        const Authorization = response.headers.get('Authorization');
        if (Authorization) {
          localStorage.setItem('Authorization', Authorization);
          logIn(); 

          const roleResponse = await fetch('http://localhost:8080/api/role', {
            method: 'GET',
            headers: {
              "Authorization": Authorization,
              "Content-Type": "application/json",
            },
          });

          if (roleResponse.ok) {
            const roleData = await roleResponse.json();
            const userRole = roleData.role;

            setRole(userRole); 
            alert('로그인 성공');
            navigate('/'); // 로그인 후 메인 페이지로 이동
          } else {
            alert('역할 정보를 가져오는 중 오류가 발생했습니다.');
          }
        } else {
          alert('인증 토큰을 가져오는 중 오류가 발생했습니다.');
        }
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      {showResetPassword ? (
        <ResetPasswordForm setShowResetPassword={setShowResetPassword} />
      ) : (
        <form onSubmit={LoginProcess}>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={onChangeForm}
              required
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={onChangeForm}
              required
            />
          </div>
          <button type="submit">로그인</button>
          <button type="button" onClick={() => navigate('/')}>메인</button>
          <button type="button" onClick={() => setShowResetPassword(true)}>비밀번호 찾기</button>
        </form>
      )}
    </div>
  );
};

export default Login;
