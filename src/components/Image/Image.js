import React from 'react';
import classes from './Image.css';


const image = (props) => {
    let removeButton = props.canDelete ? <button className={classes.Btn} onClick={props.clickRemove}>x</button> : null;
    return (
        <div className={classes.Container}  onClick={props.clickImage}>
            <img className={classes.Image}
                src={"data:image/png;base64," + props.base64String}
                alt={props.name}
               
            />
            {removeButton}
        </div>

    )
}

export default image;