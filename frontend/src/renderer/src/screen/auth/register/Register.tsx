import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from 'scrollreveal';
import user from '../assets/user.svg';

/* eslint-disable prettier/prettier */
const Register: React.FC = () => {

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

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

    return (
        <main className="register-main-content">
            <section className='register-section-conent'>
                <form className='form-content'>
                    <div className='dsp-flex'>
                        <div className='dsp-grid'>
                            <div className='auth-title'>
                                <h1>
                                    Register
                                </h1>
                            </div>
                            <div className='input-content'>
                                <label htmlFor="email">Username:</label>
                                <input type="text" />
                            </div>
                            <div className='input-content'>
                                <label htmlFor="email">Email:</label>
                                <input type="text" />
                            </div>
                            <div className='align-content'>
                                <div className='input-content'>
                                    <label htmlFor="senha">Password:</label>
                                    <input type="password" />
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
                                <img src={handleImagePreview() || user} alt="userImage" />
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