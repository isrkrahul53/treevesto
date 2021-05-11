import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Typography id="range-slider" gutterBottom>
        Price range
      </Typography> */}
      <Slider
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={props.change}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
