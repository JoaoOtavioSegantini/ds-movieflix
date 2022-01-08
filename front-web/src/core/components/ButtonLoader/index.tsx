import './styles.scss'

type Props = {
  isLoading: boolean
  disabled: boolean
}

const ButtonLoader = ({ isLoading, disabled }: Props) => {
  return isLoading ? (
    <button className="btn-icon btn-primary row" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm  col-6"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="sr-only">
        <h5 className="btn-text">Carregando...</h5>
      </span>
    </button>
  ) : (
    <button className="btn-icon btn-primary" disabled={disabled}>
      <h5>LOGAR</h5>
    </button>
  )
}

export default ButtonLoader
