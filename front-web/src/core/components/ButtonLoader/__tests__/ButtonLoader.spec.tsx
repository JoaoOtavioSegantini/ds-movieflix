import { render, screen } from '@testing-library/react'
import ButtonLoader from '..'

describe('<ButtonLoader />', () => {
  test('should render button animation component when loading is true', () => {
    render(<ButtonLoader isLoading={true} disabled />)

    const text = screen.getByText('Carregando...')

    expect(text).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })
  test('should render button component when loading is false and disable is true', () => {
    render(<ButtonLoader isLoading={false} disabled />)

    const text = screen.getByText('LOGAR')

    expect(text).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })
  test('should render button component when loading is false and disable is false', () => {
    render(<ButtonLoader isLoading={false} disabled={false} />)

    const text = screen.getByText('LOGAR')

    expect(text).toBeInTheDocument()
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
  })
})
