import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from '..'
import * as React from 'react'

test('should render <Alert /> component', () => {
  const setState = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateMock: any = (init: any) => [init, setState]

  jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  render(<Alert onClick={() => setState(false)} />)
  const error = screen.getByText('Usuário ou senha inválidos!')
  const close = screen.getByText(/x/i)
  const alert = screen.getByTestId('alert')

  expect(close).toBeInTheDocument()
  expect(error).toBeInTheDocument()
  expect(alert).toBeInTheDocument()
  expect(alert).toHaveStyle({ backgroundColor: 'var(--alert-white)' })
  expect(error).toHaveStyle({ color: 'var(--invalid-form-color)' })
  expect(close).toHaveStyle({ color: 'var(--invalid-form-color)' })
  userEvent.click(close)
  expect(setState).toHaveBeenCalledTimes(1)
  expect(setState).toBeCalledWith(false)
  expect(close.onclick?.call.length).toBe(1)
})
