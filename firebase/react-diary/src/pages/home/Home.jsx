import React from 'react'
import styles from './Home.module.css'
import DiaryForm from './DiaryForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection';
import DiaryList from './DiaryList';

export default function Home() {

    const { user } = useAuthContext();
    const { documents, error } = useCollection('diary', ['uid', '==', user.uid]);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;

    return (
        <div className={styles.container}>
            <main className={styles["diary-main"]}>
                <h2 className={styles.heart}>{formattedDate}의 비밀일기</h2>
                <DiaryForm uid={user.uid}></DiaryForm>
            </main>
            <section>
                <h2 className="a11y-hidden">일기 목록</h2>
                <ul>
                    {error && <strong>{error}</strong>}
                    {documents && <DiaryList diaries={documents} />}
                </ul>
            </section>
        </div>
    )
}