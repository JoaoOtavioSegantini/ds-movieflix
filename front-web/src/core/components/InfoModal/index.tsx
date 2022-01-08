import './styles.scss'

import { ReactComponent as CloseButton } from '@images/close.svg'
import { ReactComponent as ExclamationTriangle } from '@images/warning.svg'

type Props = {
  close: () => void
}

export const Modal = ({ close }: Props) => {
  return (
    <div className="overlay">
      <div className="container-modal">
        <header>Erro de validação</header>
        <strong>
          <ExclamationTriangle
            style={{ paddingRight: '15px', width: '3rem' }}
            data-testid="exclamation-icon"
          />
          Ação não permitida!
        </strong>
        <p>
          Não é permitido inserir uma avaliação com um texto vazio! Para salvar
          uma avaliação, por favor insira um texto.
        </p>

        <button type="button" onClick={close}>
          <CloseButton />
        </button>
      </div>
    </div>
  )
}
