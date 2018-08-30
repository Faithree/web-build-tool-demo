import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames'
// import PropTypes from './utils/proptypes'
// import { getGrid } from './utils/grids'

// import Styles from './styles/_buttons.scss'
// console.log(Component);
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('1');
    // if (this.locked) return

    // const { throttle, onClick } = this.props

    // onClick && onClick()

    // if (throttle) {
    //   this.locked = true
    //   setTimeout(() => {
    //     this.locked = false
    //   }, throttle)
    // }
  }

  render() {
    return (
      <div>
        <h1>title</h1><div>content</div>
      </div>
    );
  }
}

// Button.propTypes = {
//   children: PropTypes.any,
//   className: PropTypes.string,
//   disabled: PropTypes.bool,
//   grid: PropTypes.grid,
//   onClick: PropTypes.func,
//   once: PropTypes.bool,
//   size: PropTypes.size,
//   status: PropTypes.oneOf([
//     'primary',
//     'secondary',
//     'success',
//     'warning',
//     'danger',
//     'error',
//     'info',
//     'link'
//   ]),
//   style: PropTypes.object,
//   tag: PropTypes.string,
//   throttle: PropTypes.number,
//   type: PropTypes.oneOf(['submit', 'button', 'reset'])
// };

// Button.defaultProps = {
//   size: 'middle',
//   status: 'secondary',
//   tag: 'button',
//   type: 'button'
// };
