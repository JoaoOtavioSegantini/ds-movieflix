import './styles.scss'

import { ReactComponent as VisibilityOn } from '@images/visibilityon.svg'
import { ReactComponent as VisibilityOff } from '@images/visibilityoff.svg'

type Props = {
  errors: boolean
  errorPasswordMessage?: string
  showPassword: boolean
  handleClickPassword: () => void
  handleMouseDownPassword: (event: React.MouseEvent) => void
}

const IconShow = ({
  errors,
  errorPasswordMessage,
  showPassword,
  handleClickPassword,
  handleMouseDownPassword
}: Props) => {
  return errors ? (
    <div className="invalid-feedback d-block">{errorPasswordMessage}</div>
  ) : (
    <div className="col d-flex icon-show-hide">
      {showPassword ? (
        <VisibilityOn
          className="visibilityon"
          data-testid="visibilityon"
          onClick={handleClickPassword}
          onMouseDown={handleMouseDownPassword}
        />
      ) : (
        <VisibilityOff
          className="visibilityoff"
          data-testid="visibilityoff"
          onClick={handleClickPassword}
          onMouseDown={handleMouseDownPassword}
        />
      )}
    </div>
  )
}
export default IconShow
