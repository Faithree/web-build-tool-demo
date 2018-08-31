import * as React from 'react';
import { func } from 'prop-types';

interface ButtonShape {
  children?: any,
  className?: any,
  disabled?: any,
  grid?: any,
  onClick?: any,
  once?: any,
  size?: any,
  status?: any,
  style?: any,
  tag?: any,
  throttle?: any,
  type?: any
}
export default class Button extends React.Component<ButtonShape, any>{
  constructor(parameters: ButtonShape);
  handleClick(): void;
}
