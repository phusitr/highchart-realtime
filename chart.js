
//
// Example react hook 
// Fetching realtime data from api
// Plot series & xAxis category
// @Author : Phusit Roongroj <phusit@nectec.or.th>
// 2021
//
// Example api data
 /*[
  {
    "Date": "Jan-01",
    "Price1": 55.34,
    "Price2": 61.05,
    "Price3": 1.791
  },
  {
    "Date": "Feb-02",
    "Price1": 55.6,
    "Price2": 45.39,
    "Price3": 50
  },
  {
    "Date": "Mar-02",
    "Price1": 105.6,
    "Price2": 72.39,
    "Price3": 20
  }
]
*/

import React, { useState, useEffect } from "react";
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.js";
import HighchartsReact from "highcharts-react-official";

const Chart = () => {
  const [options, setOptions] = useState({
    title: {
      text: "Example fetch x,y to highchart"
    },
    xAxis : {
	categories : [{}],
	labels : {
	  rotation : -90,
	  step:1,
	  style : {
		color : '#000000',
	        fontFamily : '"PROMPT"',
		fontSize:'8pt',
		fontWeight: 'normal'
	  }
	},
     },
    series: [{}, {}, {}]
  });

 useEffect(() => {
     const intervalId = setInterval (() => {
     
     fetch("<YOUR API URL>")
       .then(response => {
          return response.json();
      })
       .then(data => {
          const series = [
          {
            name: "Price1",
            data: []
          },
          {
            name: "Price2",
            data: []
          },
          {
            name: "Price3",
            data: []
          }
      ];

      const categories = [];

      data.forEach(function(el) {
         series[0].data.push([el.Date, el.Price1]);
         series[1].data.push([el.Date, el.Price2]);
         series[2].data.push([el.Date, el.Price3]);
         categories.push(el.Date); 
     });
     setOptions({ series: series });
     setOptions({xAxis:{categories:categories}});
   });
  },1000);
  return () => clearInterval(intervalId);
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
