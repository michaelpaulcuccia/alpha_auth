import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return <li>Loading...</li>
            case false:
                return <li><a href='/auth/google'>Login With Google <i className='fab fa-google-plus-g black'></i></a></li>;
            default:
                return <li><a href='/api/logout'>Logout</a></li>;
        }
    }

    render() {

        //console.log(this.props)
        //console.log(this.props.auth)

        return (
            <nav>
                <div className="nav-wrapper black">
                    <Link to={this.props.auth ? '/dashboard' : '/'}
                        className="left brand-logo"
                        style={{ marginLeft: '5px' }}
                    >
                        home
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

//connects component to redux - this.props.auth
function mapStateToProps({ auth }) {
    return { auth: auth }
}

export default connect(mapStateToProps)(Header);