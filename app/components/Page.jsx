import React, { Component,PropTypes } from 'react';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addendum: '',
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        let clickState = !this.state.isClicked;
        let a = clickState ? ' - Click ' : '';

        this.setState({addendum: a, isClicked: clickState});
    }

    render() {
        const msg = this.props.msg + this.state.addendum;
        let cssClass = this.state.isClicked ? 'card--selected' : 'card';
        return  (
            <div className="stripe">
                <div className={cssClass} onClick={this.handleClick}>{msg}</div>
            </div>
        );
    }

    static propTypes = {
        msg: PropTypes.string.isRequired
    }

    static defaultProps = {
        msg: 'Moinsen'
    }
}