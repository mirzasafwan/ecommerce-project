import React from 'react';
import './InfiniteSlider.css';

function InfiniteSlider() {
    return (
        <div>
            <section>
                <div className="container">
                    <h1>pure css, responsive, infinite loop sliders</h1>
                    <h3>or carousel with no controls, and only goes one direction. so not a carousel at all. </h3>
                </div>
            </section>
            <section className="slide-option">
                <div className="container">
                    <h3 className="no-marg">slide start to finish infinite loop</h3>
                </div>
                <div id="stffull" className="highway-slider">
                    <div className="container highway-barrier">
                        <ul className="highway-lane">
                            <li id="red" className="highway-car">
                                <h4>I am not sure what something like this could be used for.</h4>
                            </li>
                            <li id="orange" className="highway-car">
                                <h4>It looks pretty cool though, and functions well.</h4>
                            </li>
                            <li id="yellow" className="highway-car">
                                <h4>As you read it, and wait for the next slide, it's almost hypnotizing.</h4>
                            </li>
                            <li id="green" className="highway-car">
                                <h4>Keep on reading and maybe I'll cast mind control on you... <span className="fas fa-hat-wizard"></span></h4>
                            </li>
                            <li id="blue" className="highway-car">
                                <h4><span className="fas fa-magic"></span> BOOM! magic. you're under mind control.</h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="slide-option">
                <div className="container">
                    <h3 className="no-marg">closed infinite loop</h3>
                </div>
                <div id="infinite" className="highway-slider">
                    <div className="container highway-barrier">
                        <ul className="highway-lane">
                            <li className="highway-car"><span className="fab fa-angular"></span></li>
                            <li className="highway-car"><span className="fab fa-js"></span></li>
                            <li className="highway-car"><span className="fab fa-node"></span></li>
                            <li className="highway-car"><span className="fab fa-html5"></span></li>
                            <li className="highway-car"><span className="fab fa-less"></span></li>
                            <li className="highway-car"><span className="fab fa-gulp"></span></li>
                            <li className="highway-car"><span className="fab fa-stack-overflow"></span></li>
                            <li className="highway-car"><span className="fab fa-codepen"></span></li>
                            <li className="highway-car"><span className="fab fa-aws"></span></li>
                            <li className="highway-car"><span className="fab fa-gitlab"></span></li>
                            <li className="highway-car"><span className="fab fa-chrome"></span></li>
                            <li className="highway-car"><span className="fab fa-google"></span></li>

                            <li className="highway-car"><span className="fab fa-angular"></span></li>
                            <li className="highway-car"><span className="fab fa-js"></span></li>
                            <li className="highway-car"><span className="fab fa-node"></span></li>
                            <li className="highway-car"><span className="fab fa-html5"></span></li>
                            <li className="highway-car"><span className="fab fa-less"></span></li>
                            <li className="highway-car"><span className="fab fa-gulp"></span></li>
                            <li className="highway-car"><span className="fab fa-stack-overflow"></span></li>
                            <li className="highway-car"><span className="fab fa-codepen"></span></li>
                            <li className="highway-car"><span className="fab fa-aws"></span></li>
                            <li className="highway-car"><span className="fab fa-gitlab"></span></li>
                            <li className="highway-car"><span className="fab fa-chrome"></span></li>
                            <li className="highway-car"><span className="fab fa-google"></span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InfiniteSlider;
