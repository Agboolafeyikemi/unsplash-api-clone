import React from 'react';
import style from './Backdrop.module.scss';

const backdrop = (props) => (
    props.show ? <div className={style.Backdrop}
    onClick={props.clicked}></div> : null
);
export default backdrop;