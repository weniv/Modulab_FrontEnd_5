import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../img/logo.svg';
import { useLogout } from '../../hooks/useLogout';

export default function Header() {

    const { logout } = useLogout();

    return (
        <header>
            <div className={styles["header-wrap"]}>
                <h1>
                    <Link to="/">
                        <img className={styles.logo} src={logo} alt="두근두근 비밀일기" />
                    </Link>
                </h1>
                <div>
                    <Link to="/signup" className="btn-join">회원가입</Link>
                    <Link to="/login" className="btn-logout" onClick={logout}>로그아웃</Link>
                </div>
            </div>
        </header>
    )
}
