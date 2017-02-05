import React from 'react';
import ReactBubbleChart from 'react-bubble-chart';


import translate from '../../translate.jsx';

var colorLegend = [
  "#ce5f5f",
  "#5fb35f",
  "#e09c5c"
];

const BubbleChart = ({strings, data}) => {
    let index = -1;
    const bubbleData = data.reduce((prev, sameSizedItems) => {
      return prev.concat( sameSizedItems.items.map((item) => {
          index++;
          return {
            _id: index,
            displayText: item,
            value: sameSizedItems.size,
            colorValue: index % 3
          }
        })
      )}, []
    );

    return (
      <div className="bubble-chart">
        <ReactBubbleChart
          className="bubble-chart-container"
          data={ bubbleData}
          colorLegend={colorLegend}

        />
      </div>
    );

}

export default translate(BubbleChart);
