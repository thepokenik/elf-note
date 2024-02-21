import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollReveal from 'scrollreveal';
import userBaseImage from '../assets/user.svg';

interface User {
    id: null;
    username: string;
    email: string;
    password: string;
}

/* eslint-disable prettier/prettier */
const Register: React.FC = () => {

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const form = new FormData();

    const [user, setUser] = useState<User>({
        id: null,
        username: '',
        email: '',
        password: '',
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleImagePreview = () => {
        if (profileImage) {
            return URL.createObjectURL(profileImage);
        }
        return null;
    };

    useEffect(() => {
        const sr = ScrollReveal();

        const calculateDistance = () => {
            return window.innerWidth > 768 ? '70px' : '15px';
        };

        sr.reveal('.form-content', {
            origin: 'bottom',
            duration: 1000,
            distance: calculateDistance(),
            reset: true,
        });

    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.append('user', JSON.stringify(user));
        form.append('profilePic', profileImage || '');

        console.log(form.get('user'));
        fetch('http://localhost:4000/users/register', {
            method: 'POST',
            body: form,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });

        navigate('/auth/login');
    }

    return (
        <main className="register-main-content">
            <section className='register-section-conent'>
                <form className='form-content' onSubmit={handleSubmit}>
                    <div className='dsp-flex'>
                        <div className='dsp-grid'>
                            <div className='auth-title'>
                                <h1>
                                    Register
                                </h1>
                            </div>
                            <div className='input-content'>
                                <label htmlFor="email">Email:</label>
                                <input
                                type="text"
                                value={user.email || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setUser((prev) => ({ ...prev, email: e.target.value }))}
                            />
                            </div>
                            <div className='input-content'>
                                <label htmlFor="username">Username:</label>
                                <input
                                type="text"
                                value={user.username || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setUser((prev) => ({ ...prev, username: e.target.value }))}
                            />
                            </div>
                            <div className='align-content'>
                                <div className='input-content'>
                                    <label htmlFor="senha">Password:</label>
                                    <input type="password" value={user.password || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setUser((prev) => ({ ...prev, password: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className='btn'>
                                <button>Create</button>
                            </div>

                            <div className='create-account'>
                                <Link to={"/auth/login"}>
                                    <span>
                                        Log in
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="authFieldImage">
                            <span>Select your profile image</span>
                            <div className="imagePreview" onClick={handleImageClick}>
                                <img src={handleImagePreview() || userBaseImage} alt="userImage" />
                            </div>
                            <input
                                ref={inputRef}
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Register;