import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IconShow from '..'

describe('<IconShow /> ', () => {
  test('should render errors message when error is true', () => {
    const iconProps = {
      errors: true,
      errorPasswordMessage: 'a simple message error',
      showPassword: false,
      handleClickPassword: () => null,
      handleMouseDownPassword: () => null
    }

    render(<IconShow {...iconProps} />)

    expect(screen.getByText(iconProps.errorPasswordMessage)).toBeInTheDocument()
  })

  test('should render icon <VisibilityOff /> when error is false', () => {
    const iconProps = {
      errors: false,
      errorPasswordMessage: 'a simple message error',
      showPassword: false,
      handleClickPassword: jest.fn(),
      handleMouseDownPassword: jest.fn()
    }

    render(<IconShow {...iconProps} />)

    expect(
      screen.queryByText(iconProps.errorPasswordMessage)
    ).not.toBeInTheDocument()

    expect(screen.getByTestId('visibilityoff')).toBeInTheDocument()
    expect(screen.queryByTestId('visibilityon')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('visibilityoff'))
    expect(iconProps.handleClickPassword).toBeCalled()
    expect(iconProps.handleMouseDownPassword).toBeCalled()
  })

  test('should render icon <VisibilityOn /> when error is false', () => {
    const iconProps = {
      errors: false,
      errorPasswordMessage: 'a simple message error',
      showPassword: true,
      handleClickPassword: jest.fn(),
      handleMouseDownPassword: jest.fn()
    }

    render(<IconShow {...iconProps} />)

    expect(
      screen.queryByText(iconProps.errorPasswordMessage)
    ).not.toBeInTheDocument()

    expect(screen.getByTestId('visibilityon')).toBeInTheDocument()
    expect(screen.queryByTestId('visibilityoff')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('visibilityon'))
    expect(iconProps.handleClickPassword).toBeCalled()
    expect(iconProps.handleMouseDownPassword).toBeCalled()
  })
})
