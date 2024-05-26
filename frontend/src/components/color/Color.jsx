import React from 'react';
import './Color.css';

function Color(props) {
    const { colorData } = props;
    return (
        <div className='color'>
            <ul>
                {colorData && colorData.map((item, index) => {
                    return (
                        <li style={{ backgroundColor: item?.title }} key={index}></li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Color;
