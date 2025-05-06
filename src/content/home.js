import styles from './home.module.css';

export default function Home() {
    return (
        <div className={styles.aboutcontainer}>
            <section className={styles.about}>
                <p>
                    At <b>Dental Office</b>, we are dedicated to delivering exceptional care in a warm and friendly atmosphere.
                    Our experienced team of dental professionals works hard to ensure each patient receives customized treatment and the highest quality of care.
                </p>
                <p>
                    Whether you're visiting for a routine cleaning, restorative work, or cosmetic treatments,
                    we utilize the latest advancements in dental technology and techniques to achieve exceptional results.
                    Your smile and overall health are our top priorities, and we are here to support you at every stage of your journey.
                </p>
                <p>
                We focus on prevention and patient education, aiming to create long-lasting relationships while ensuring every visit is comfortable and stress-free.
                </p>
            </section>
            <section className={styles.imagescontainer}>
                <img className={styles.imagesdentalchair} src="dentaloffice_dentalchair.jpg" alt="Dental Chair" />
                <img className={styles.imagesconsult} src="dentaloffice_consult.jpg" alt="Consultation" />
            </section>
            <section className={styles.contactinfo}>
                <h3>Contact Us</h3>
                <p>📞 Phone: +65 6222 3322</p>
                <p>📧 E-mail: inquire@dentaloffice.com</p>
                <p>📍 Address: Singapore General Hospital, Outram Road, Singapore 169608 </p>
            </section>
        </div>
    );
}