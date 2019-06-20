import React from 'react';
import CloseIcon from '../../assets/CloseIcon';
import styles from './Popper.module.scss';
const Popper = ({children, className, ...props}) => {  
    const {handleClose} = props;
    return (
        <div className={styles.Popper} >
        <CloseIcon className={styles.CloseIcon} onClick={handleClose}></CloseIcon>
            {children}
        </div>
    );
}

export default Popper; 