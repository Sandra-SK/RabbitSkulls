import React, {useState, useEffect} from 'react'


const PopUp = (props) =>{
    return (
        <div>
            {props.isPopUp && <div className="popUp">


                <button
                    className="closePopUp"
                    onClick={(e)=>{
                        props.onClickClose()
                    }}
                >
                X
                </button>
                <h4>Merveilleux !</h4>
                <p>{props.msg}</p>

                
            </div>}
        </div>
    )
}

export default PopUp