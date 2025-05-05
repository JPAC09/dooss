import { useNavigate } from "react-router-dom";

export default function Services() {
    const navigate = useNavigate();

    const handleServiceBook = () => {
        navigate('/book');
    }
    return (
        <ul>
            <li>Teeth Cleaning</li>
            <li>Tooth Extraction</li>
            <li>Dentures</li>
            <button onClick={() => handleServiceBook()}>Book an appointment</button>
        </ul>
    );
}