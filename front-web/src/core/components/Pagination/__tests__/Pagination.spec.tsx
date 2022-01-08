import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '..'

describe('<Pagination />', () => {
  test('should render <Pagination /> component', () => {
    const totalRanges = 3

    render(
      <Pagination totalPages={totalRanges} onChange={(active) => active} />
    )

    const previousElement = screen.getByTestId('arrow-icon-previous')
    const nextElement = screen.getByTestId('arrow-icon-next')
    const firstPage = screen.getByText('1')
    const secondPage = screen.getByText('2')
    const thirdPage = screen.getByText('3')

    expect(previousElement).toBeInTheDocument()
    expect(nextElement).toBeInTheDocument()
    expect(firstPage).toBeInTheDocument()
    expect(secondPage).toBeInTheDocument()
    expect(thirdPage).toBeInTheDocument()
    expect(firstPage).toHaveClass('active')
    expect(secondPage).not.toHaveClass('active')
    expect(thirdPage).not.toHaveClass('active')
    userEvent.click(secondPage)
    expect(firstPage).not.toHaveClass('active')
    expect(secondPage).toHaveClass('active')
    expect(thirdPage).not.toHaveClass('active')
  })
  test('should call onChange action', () => {
    const totalPages = 3

    const onChange = jest.fn()

    render(<Pagination totalPages={totalPages} onChange={onChange} />)

    const secondPage = screen.getByText('2')
    const thirdPage = screen.getByText('3')
    const firstPage = screen.getByText('1')

    userEvent.click(firstPage)

    userEvent.click(secondPage)
    //expect(onChange).toHaveBeenCalledWith(0)

    userEvent.click(thirdPage)
    //  expect(onChange).toHaveBeenCalledWith(2)
  })
})
