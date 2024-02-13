/* eslint-disable prettier/prettier */
import './css/style.css';


const Register: React.FC = () => {
    return (
        <main className="register-main-content">
            <section className='register-section-conent'>
                <h1>
                    Log in
                </h1>

                <form className='form-content'>
                    <div className='dsp-flex'>
                        <div className='dsp-grid'>
                            <div className='input-content'>
                                <label htmlFor="email">Email:</label>
                                <input type="text" />
                            </div>
                            <div className='input-content'>
                                <label htmlFor="senha">Password:</label>
                                <input type="password" />
                            </div>
                        </div>

                        <svg width="284" height="284" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 30C10 18.9543 18.9543 10 30 10H254C265.046 10 274 18.9543 274 30V254C274 265.046 265.046 274 254 274H30C18.9543 274 10 265.046 10 254V30Z" fill="url(#paint0_linear_92_12)" fill-opacity="0.1" />
                            <path d="M30 5C16.1929 5 5 16.1929 5 30V254C5 267.807 16.1929 279 30 279H254C267.807 279 279 267.807 279 254V30C279 16.1929 267.807 5 254 5H30Z" stroke="white" stroke-opacity="0.1" stroke-width="10" />
                            <path d="M33 149H198" stroke="white" stroke-opacity="0.1" stroke-width="30" />
                            <path d="M33.2256 117V35.24H83.6256V49.576H49.6896V67.944H79.7056V82.28H49.6896V102.664H83.6256V117H33.2256Z" fill="white" fill-opacity="0.1" />
                            <path d="M135.102 117C130.771 117 126.963 116.104 123.678 114.312C120.393 112.445 117.817 109.869 115.95 106.584C114.158 103.299 113.262 99.4907 113.262 95.16V50.36H94.2219V35.24H130.062V95.16C130.062 97.176 130.659 98.8187 131.854 100.088C133.123 101.283 134.766 101.88 136.782 101.88H154.702V117H135.102Z" fill="white" fill-opacity="0.1" />
                            <path d="M180.418 117V77.8H164.066V62.68H180.418V54.28C180.418 48.5307 182.359 43.9387 186.242 40.504C190.199 36.9947 195.351 35.24 201.698 35.24H219.73V49.8H202.258C200.765 49.8 199.533 50.2853 198.562 51.256C197.666 52.152 197.218 53.3467 197.218 54.84V62.68H219.73V77.8H197.218V117H180.418Z" fill="white" fill-opacity="0.1" />
                            <defs>
                                <linearGradient id="paint0_linear_92_12" x1="142" y1="10" x2="142" y2="274" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.46" stop-color="#3A0057" />
                                    <stop offset="0.81" stop-color="#111111" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Register;