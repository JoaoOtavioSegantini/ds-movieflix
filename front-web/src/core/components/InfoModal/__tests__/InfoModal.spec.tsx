import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '..'

test('should render <Modal /> component', () => {
  const handleCloseModal = jest.fn()
  render(<Modal close={handleCloseModal} />)

  const headerElement = screen.getByText(/erro de validação/i)
  const titleElement = screen.getByText(/ação não permitida!/i)
  const messageElement = screen.getByText(
    /não é permitido inserir uma avaliação com um texto vazio! Para salvar uma avaliação, por favor insira um texto./i
  )

  expect(headerElement).toBeInTheDocument()
  expect(titleElement).toBeInTheDocument()
  expect(messageElement).toBeInTheDocument()
  expect(screen.getByTestId('exclamation-icon')).toBeInTheDocument()

  userEvent.click(screen.getByRole('button'))
  expect(handleCloseModal).toHaveBeenCalled()
})
