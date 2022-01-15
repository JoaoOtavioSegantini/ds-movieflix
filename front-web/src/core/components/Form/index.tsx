import './styles.scss'

import { FormState } from 'src/pages/Home'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'

type Props = {
  errors: DeepMap<FormState, FieldError>
  register: UseFormRegister<FormState>
  showText: boolean
  children: React.ReactNode
  isReset: boolean
}
const Form = ({ errors, register, showText, children, isReset }: Props) => {
  return (
    <>
      <input
        type="email"
        className={`form-control d-flex ${
          errors.username ? 'is-invalid' : ''
        } `}
        placeholder="Email"
        {...register(isReset ? 'to' : 'username', {
          required: 'Campo obrigatório',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        })}
      />
      {errors.username && (
        <div className="invalid-feedback d-block" data-testid="username-error">
          {errors.username.message}
        </div>
      )}
      {isReset && errors.to && (
        <div className="invalid-feedback d-block" data-testid="to-error">
          {errors.to.message}
        </div>
      )}
      {!isReset ? (
        <div className="group ">
          <input
            className={`form-control col ${
              errors.password ? 'is-invalid' : ''
            } `}
            type={showText ? 'text' : 'password'}
            placeholder="Senha"
            {...register('password', {
              required: 'Campo obrigatório'
            })}
          />

          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Form
