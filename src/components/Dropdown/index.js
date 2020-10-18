import React, { Component } from "react";
import classNames from "classnames/bind";

import "./index.scss";

class Dropdown extends Component {

  constructor(props){
    super(props);
    this.state = {
      isVisible: props.visible || false,
      positionX: 0,
      positionY: 0,
    }
    this.handlerRef = React.createRef();
    this.dropdownRef = React.createRef();
  }

  componentDidMount(){
    this.setPosition();
    window.addEventListener('resize', this.setPosition);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps){
    if(this.props.children !== prevProps.children){
      this.setPosition();
    }
    if(this.props.handler !== prevProps.handler){
      this.setPosition();
    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.setPosition);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  handleClickOutside = event => {
    if(!this.state.isVisible){
      return;
    }
    if (this.handlerRef && this.handlerRef.current.dom.contains(event.target)) {
      return;
    }
    if (this.dropdownRef && !this.dropdownRef.current.contains(event.target)) {
      this.setState({
        isVisible: false,
      });
    }
  }

  toggleVisibility = () => this.setState((prevState) => {
    return { isVisible: !prevState.isVisible };
  }, () => {
    this.setPosition();
  });

  setPosition = () => {

    const spaceWithDropdown = this.props.gap || 5;
    const offsetBottom = this.props.offset && this.props.offset.bottom || 0;

    // Viewport size and scroll:
    const {
      innerWidth: windowWidth,
      innerHeight: windowHeight,
      scrollX,
      scrollY,
    } = window;
    
    // Dropdown size:
    const {
      offsetWidth: dropdownWidth,
      offsetHeight: dropdownHeight,
    } = this.dropdownRef.current;

    // Handler size:
    const {
      offsetWidth: handlerWidth,
      offsetHeight: handlerHeight,
    } = this.handlerRef.current.dom;

    // Handler position:
    const {
      top: handlerTop,
      left: handlerLeft,
    } = getOffset(this.handlerRef.current.dom);

    const availableXspace = windowWidth + scrollX > (handlerLeft + dropdownWidth);
    const availableYspace = windowHeight + scrollY > (handlerTop + handlerHeight + spaceWithDropdown + dropdownHeight + offsetBottom);

    this.setState({
      positionX: availableXspace ? handlerLeft : handlerLeft + handlerWidth - dropdownWidth,
      positionY: availableYspace ? handlerTop + handlerHeight + spaceWithDropdown : handlerTop - spaceWithDropdown - dropdownHeight,
    });
  }

  render() {
    return (
      <React.Fragment>
        <DropdownHandler
          ref={this.handlerRef}
          handler={this.props.handler}
          onClick={ this.toggleVisibility }
        />
        <ul
          ref={this.dropdownRef}
          style={{ top: this.state.positionY, left: this.state.positionX }}
          className={classNames("dropdown-list", {visible: this.state.isVisible})}
        >
          {this.props.children}
        </ul>
      </React.Fragment>
    )
  }
}

class DropdownHandler extends Component {
  render(){
    return React.cloneElement(this.props.handler, {
      ...this.props,
      ref: (dom) => {
        this.dom = dom;
      },
    });
  }
}

const DropdownItem = props => {
  return <li {...props}>{props.children}</li>
};

const DropdownDivider = props => {
  return <li className="divider"></li>
}

const getOffset = element => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

export default Dropdown;
export { DropdownItem, DropdownDivider };