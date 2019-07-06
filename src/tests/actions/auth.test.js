import {login, logout,startLogin, startLogout} from '../../actions/auth';


test('should setup login action object', () => {
    const action = login('12345')
    expect(action).toEqual({
        type: 'LOGIN',
        uid: '12345'
    });
});

test('should setup logout action object', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});


