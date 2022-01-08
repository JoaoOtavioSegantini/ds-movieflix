import App from 'src/App'
import ReactDOM from 'react-dom'

jest.mock('react-dom', () => ({ render: jest.fn() }))

test('renders with App and root div', () => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)

  require('../index')

  expect(ReactDOM.render).toHaveBeenCalledWith(<App />, root)
})
