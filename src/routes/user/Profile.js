import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../tools/Modal';
import UpdatePasswordForm from '../../components/UpdatePassword'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false); // 모달 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('Authorization'); 

        if (!token) {
          navigate('/login'); 
          return;
        }

        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }

        const data = await response.json();
        setProfile(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProfile(); 
  }, [navigate]);

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error}</p>; 

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.name}</p>
          <p>Gender: {profile.gender}</p>
          <p>PhoneNumber: {profile.phoneNumber}</p>
          <p>Birthday: {profile.birthday}</p>
          <button onClick={() => setShowUpdatePassword(true)}>
            비밀번호 변경
          </button> 
        </div>
      ) : (
        <p>No profile information available.</p>
      )}

      {showUpdatePassword && (
        <Modal onClose={() => setShowUpdatePassword(false)}>
          <UpdatePasswordForm onClose={() => setShowUpdatePassword(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
