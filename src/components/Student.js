import React from 'react'
import styles from '../App.module.css';

const Student = ({ student }) => {
    return (
        <React.Fragment>
            <div className={styles.namecontent}>
                <span className={styles["student-name"]}>{`${student.name}`}</span>
            </div>
            <div className={styles.agecontent}>
                <span className={styles["student-age"]}>{`${student.age}`}</span>
            </div>
        </React.Fragment>
    )

}

export default Student