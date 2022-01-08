import './styles.scss'

type Props = {
  onClick: () => void
}

const Alert = ({ onClick }: Props) => (
  <div className="alert" data-testid="alert">
    <p className="alert-text-form-invalid">Usuário ou senha inválidos!</p>
    <span className="form-invalid-x" onClick={onClick}>
      X
    </span>
  </div>
)

export default Alert
