import { render, screen } from '@testing-library/react'
import { FormState } from 'src/pages/Home'
import { DeepMap, FieldError } from 'react-hook-form'
import Form from '..'

describe('<Form />', () => {
  test('should render form component without username errors and display user password', () => {
    const errors = {
      password: {}
    } as DeepMap<FormState, FieldError>

    const register = jest.fn()

    render(
      <Form
        errors={errors}
        register={register}
        showText
        isReset={false}
        isSignUp={false}
      >
        <div data-testid="test">Test Form</div>
      </Form>
    )

    expect(screen.queryByTestId('username-error')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toHaveAttribute('type', 'text')
    expect(screen.getByPlaceholderText('Senha')).toHaveStyle({
      borderColor: 'var(--invalid-form-color)'
    })
  })
  test('should render form component with username errors and without display user password', () => {
    const errors = {
      username: {
        message: 'a simple error message'
      }
    } as DeepMap<FormState, FieldError>

    const register = jest.fn()

    render(
      <Form
        errors={errors}
        register={register}
        showText={false}
        isReset={false}
        isSignUp={false}
      >
        <div data-testid="test">Test Form</div>
      </Form>
    )

    expect(screen.queryByTestId('username-error')).toBeInTheDocument()
    expect(screen.queryByTestId('test')).toBeInTheDocument()
    expect(screen.getByText(/a simple error message/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toHaveAttribute(
      'type',
      'password'
    )
    expect(screen.getByPlaceholderText('Senha')).toHaveStyle({
      borderColor: 'var(--input-border-color)'
    })
  })
})
