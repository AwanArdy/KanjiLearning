import styles from './KanjiCard.module.css';
import Link from 'next/link';

export default function KanjiCard({ kanji, description, link }) {
    return (
        <div className={styles.card}>
            <h2>{kanji}</h2>
            <p>{description}</p>
            <Link href={`/kanji/${kanji}`} legacyBehavior>
                <a className={styles.link}>Learn more</a>
            </Link>
        </div>
    );
}