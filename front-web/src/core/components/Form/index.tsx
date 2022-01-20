import './styles.scss'

import { FormState } from 'src/pages/Home'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'

type Props = {
  errors: DeepMap<FormState, FieldError>
  register: UseFormRegister<FormState>
  showText: boolean
  children: React.ReactNode
  isReset: boolean
  isSignUp: boolean
}
const Form = ({
  errors,
  register,
  showText,
  children,
  isReset,
  isSignUp
}: Props) => {
  return (
    <>
      {isSignUp ? (
        <>
          <input
            type="text"
            className={`form-control d-flex ${
              errors.name ? 'is-invalid' : ''
            } `}
            placeholder="Nome"
            {...register('name', {
              required: 'Campo obrigatório',
              minLength: 8
            })}
          />
          {errors.name && (
            <div
              className="invalid-feedback d-block"
              data-testid="username-error"
            >
              {errors.name.message}
            </div>
          )}
          <input
            type="email"
            className={`form-control d-flex ${
              errors.username ? 'is-invalid' : ''
            } `}
            placeholder="Email"
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
          />
          {errors.username && (
            <div
              className="invalid-feedback d-block"
              data-testid="username-error"
            >
              {errors.username.message}
            </div>
          )}
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
            {errors.password && (
              <div
                className="invalid-feedback d-block"
                data-testid="username-error"
              >
                {errors.password.message}
              </div>
            )}
            {children}
          </div>
        </>
      ) : isReset ? (
        <>
          <input
            type="email"
            className={`form-control d-flex ${errors.to ? 'is-invalid' : ''} `}
            placeholder="Email"
            {...register('to', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
          />
          {errors.to && (
            <div
              className="invalid-feedback d-block"
              data-testid="username-error"
            >
              {errors.to.message}
            </div>
          )}
        </>
      ) : (
        <>
          <input
            type="email"
            className={`form-control d-flex ${
              errors.username ? 'is-invalid' : ''
            } `}
            placeholder="Email"
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
          />

          {errors.username && (
            <div
              className="invalid-feedback d-block"
              data-testid="username-error"
            >
              {errors.username.message}
            </div>
          )}

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
            {errors.password && (
              <div
                className="invalid-feedback d-block"
                data-testid="username-error"
              >
                {errors.password.message}
              </div>
            )}
            {children}
          </div>
        </>
      )}
    </>
  )
}

export default Form
