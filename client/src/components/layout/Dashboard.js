import React from 'react';
import { connect } from 'react-redux';

const Dashboard = props => {

    //console.log(props.auth.firstName)

    return (
        <div>
            {props && props.auth && props.auth.firstName && props.auth.firstName !== '' ? `Welcome ${props.auth.firstName}` : ''}
        </div>
    )
}

//connects component to redux - props.auth
function mapStateToProps({ auth }) {
    return { auth: auth }
}

export default connect(mapStateToProps)(Dashboard);
