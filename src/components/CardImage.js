import React, { Component } from 'react'
import { Loading } from './Loading';

export default class CardImage extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false }
    }

    render() {
        return (
        <div>
            {!this.state.loaded && <div><Loading /></div>}
            <img
                className={`${this.props.className} ${this.state.loaded ? "visible" : "invisible"}`}
                src={this.props.src}
                alt={this.props.alt}
                onLoad={() => this.setState({loaded: true})}
            />
        </div>
        )
    }
}
