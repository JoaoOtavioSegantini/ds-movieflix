import * as userMock from '@utils/auth'

interface methods {
  userValidMember: () => void
  userValidVisitor: () => void
  userAll: () => void
  userInvalid: () => void
}

export default class SessionMock implements methods {
  userValidMember() {
    const loginSessionData: userMock.LoginResponse = {
      access_token: 'x.y.zzz_user_mock_token',
      expires_in: 311039999,
      scope: 'read write',
      token_type: 'string',
      userName: 'Alex Brown',
      userId: 1
    }
    userMock.saveSessionData(loginSessionData)

    const access: userMock.AccessToken = {
      user_name: 'alex@gmail.com',
      exp: Date.now() + 1000,
      authorities: ['MEMBER']
    }

    jest.spyOn(userMock, 'getAccessTokenDecoded').mockReturnValue(access)
    jest.spyOn(userMock, 'isTokenValid').mockReturnValue(true)
    jest
      .spyOn(userMock, 'isAuthenticated')
      .mockReturnValue(loginSessionData.access_token && true)
  }
  userValidVisitor() {
    const loginSessionData: userMock.LoginResponse = {
      access_token: 'x.y.zzz_user_mock_token',
      expires_in: 311039999,
      scope: 'read write',
      token_type: 'string',
      userName: 'Maria Lucia',
      userId: 1
    }
    userMock.saveSessionData(loginSessionData)

    const access: userMock.AccessToken = {
      user_name: 'maria@gmail.com',
      exp: Date.now() + 1000,
      authorities: ['VISITOR']
    }

    jest.spyOn(userMock, 'getAccessTokenDecoded').mockReturnValue(access)
    jest.spyOn(userMock, 'isTokenValid').mockReturnValue(true)
    jest
      .spyOn(userMock, 'isAuthenticated')
      .mockReturnValue(loginSessionData.access_token && true)
  }
  userAll() {
    const loginSessionData: userMock.LoginResponse = {
      access_token: 'x.y.zzz_user_mock_token',
      expires_in: 311039999,
      scope: 'read write',
      token_type: 'string',
      userName: 'Joao',
      userId: 1
    }
    userMock.saveSessionData(loginSessionData)

    const access: userMock.AccessToken = {
      user_name: 'joao@gmail.com',
      exp: Date.now() + 1000,
      authorities: ['VISITOR', 'MEMBER']
    }

    jest.spyOn(userMock, 'getAccessTokenDecoded').mockReturnValue(access)
    jest.spyOn(userMock, 'isTokenValid').mockReturnValue(true)
    jest.spyOn(userMock, 'isAllowedByRole').mockReturnValue(true)
    jest
      .spyOn(userMock, 'isAuthenticated')
      .mockReturnValue(loginSessionData.access_token && true)
  }
  userInvalid() {
    const loginSessionData: userMock.LoginResponse = {
      access_token: 'x.y.zzz_user_mock_token',
      expires_in: 311039999,
      scope: 'read write',
      token_type: 'string',
      userName: 'Joao',
      userId: 1
    }
    userMock.saveSessionData(loginSessionData)

    const access: userMock.AccessToken = {
      user_name: '',
      exp: Date.now() + 1000,
      authorities: []
    }

    jest.spyOn(userMock, 'getAccessTokenDecoded').mockReturnValue(access)
    jest.spyOn(userMock, 'isTokenValid').mockReturnValue(false)
    jest
      .spyOn(userMock, 'isAuthenticated')
      .mockReturnValue(loginSessionData.access_token && false)
  }
}
