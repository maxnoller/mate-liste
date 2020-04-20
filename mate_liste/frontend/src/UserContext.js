import React from 'react';

const UserContext = React.createContext({'user': {'id': 0, 'username': "max", 'balance': 0}, 'updateValue': null});

export default UserContext;