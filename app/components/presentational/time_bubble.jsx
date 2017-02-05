import React from 'react';
import moment from 'moment';

const TimeBubble = ({children, from, to, index}) => {
    const side = (index % 2) ? "right" : "left";

    const fromMoment= moment({month: from.month-1, year: from.year});

    let toMoment;
    if(to.month || to.year ) {
        toMoment = moment({month: to.month - 1, year: to.year});
    }

    return(
        <div className="time-bubble">
            <div className={"content-box" + " " + side}>
                <div className="details">
                    {children}
                </div>
                <div className="time">
                    <div>
                        <div className="year">{fromMoment.format("YYYY")}</div>
                        <div className="month">{fromMoment.format("MMM ")}</div>
                    </div>
                    <i className="year-line fa fa-angle-right"/>
                    {   toMoment ?
                        <div>
                            <div className="year">{toMoment.format("YYYY")}</div>
                            <div className="month">{toMoment.format("MMM ")}</div>
                        </div> : null
                    }
                </div>
                <div className={"pointer"  + " " + side}>
                    <div className="dot"></div>
                    <div className="triangle"></div>
                </div>
            </div>
        </div>
    )
};

export default TimeBubble;
