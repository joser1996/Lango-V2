import styles from "./LoginPage.module.css";

const LoginPage = () => {

    return(
        <main id={styles.loginPage}>
            <div id={styles.leftSide}>
                <div id="welcome-text">
                    <p id={styles.ttl}>Welcome to Lango!</p>
                    <p id={styles.sub}>Customize your vocabulary</p>
                </div>
            </div>
            <div id={styles.rightSide}>
                <a href="http://172.20.113.243:3003/auth/google" className={styles.googleBtn}>
                    <div className={styles.googleIconWrapper}>
                        <img className={styles.googleIcon}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google Login Button"
                        />
                    </div>
                    <p className={styles.btnText}><b>Sign in with google</b></p>                   
                </a>
            </div>
        </main>
    );
};

export default LoginPage;