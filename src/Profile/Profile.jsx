import styles from './profile.module.css';


function Profile(){

    const pic = localStorage.getItem("Picture")
    const firstname = localStorage.getItem("FirstName")
    const lastname = localStorage.getItem("LastName")
    const api = localStorage.getItem("apiKey")
    const email = localStorage.getItem("email")
    const company = localStorage.getItem("companyname")

    return(
        <>
            <div className={styles.profileContainer}>
                <img className={styles.pictureContainer} src={pic} alt='Profile Picture' />
                <p className={styles.textContainer}>First Name: {firstname}</p>
                <p className={styles.textContainer}>Last Name: {lastname}</p>
                <p className={styles.textContainer}>email: {email}</p>
                <p className={styles.textContainer}>Company: {company}</p>
                <p className={styles.textContainer}>API key: {api}</p>
            </div>
        </>
    );
}


export default Profile;