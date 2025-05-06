
import styles from './services.module.css';
import { useNavigate } from "react-router-dom";

export default function Services() {
    const navigate = useNavigate();

    const handleServiceBook = () => {
        navigate('/book');
    }
    return (
        <div className={styles.servicescontainer}>
            <ul>
                <li>🦷 Teeth Cleaning (Prophylaxis)</li>
                <li>🦷 Fillings</li>
                <li>🦷 Tooth Extractions</li>
                <li>🦷 Root Canal Therapy</li>
                <li>🦷 Crowns and Bridges</li>
                <li>🦷 Dental Implants</li>
                <li>🦷 Orthodontic Treatment</li>
                <li>🦷 Teeth Whitening</li>
            </ul>
            <div className={styles.buttoncontainer}>
                <button onClick={() => handleServiceBook()}>Book an appointment</button>
            </div>
        </div>
    );
}