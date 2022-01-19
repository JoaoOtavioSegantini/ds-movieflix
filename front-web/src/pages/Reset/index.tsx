import { ReactComponent as MainImage } from '@images/login.svg'
import { ReactComponent as ArrowIcon } from '@images/arrow.svg'

import { Link, useHistory } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { makeRequest } from '@utils/request'
import Alert from '@components/Alert'
import ButtonLoader from '@components/ButtonLoader'
import { toast } from 'react-toastify'
import IconShow from '@components/IconShow'

export type FormState = {
  password: string
  confirm: string
}

const Reset = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    showPassword2: false
  })

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<FormState>()

  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const password = useRef({})
  password.current = watch('password', '')

  const handleClickPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleClickPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const onChangePass = (data: FormState) => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    setHasError(false)
    setIsLoading(true)
    makeRequest({
      url: '/emails/reset',
      method: 'POST',
      data: { password: data.password, token },
      headers: { 'content-type': 'application/json' }
    })
      .then(() => {
        setIsLoading(false)
        toast.success('Senha mudada com sucesso!')
        history.replace('/')
      })
      .catch((err) => {
        toast.error(err.response?.data.message)
        setIsLoading(false)
      })
  }

  return (
    <div className="home-container body-color">
      <div className="home-content">
        <div className="home-text col-6">
          <h1 className="text-title">Avalie Filmes</h1>
          <h1 className="text-subtitle">
            Diga o que você achou do seu filme favorito
          </h1>
          <MainImage className="main-image" data-testid="main-image" />
        </div>
        <form
          className="col-6 login-base"
          onSubmit={handleSubmit(onChangePass)}
        >
          <h1 className="login-title">RESETAR SENHA</h1>
          {hasError && <Alert onClick={() => setHasError(false)} />}
          {/* FORMULÁRIOS */}

          <input
            className={`form-control col ${
              errors.password ? 'is-invalid' : ''
            } `}
            type={values.showPassword ? 'text' : 'password'}
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
          <IconShow
            errors={!!errors.password}
            errorPasswordMessage={errors?.password?.message}
            showPassword={values.showPassword}
            handleClickPassword={handleClickPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />

          <input
            className={`form-control col ${
              errors.password ? 'is-invalid' : ''
            } `}
            type={values.showPassword2 ? 'text' : 'password'}
            placeholder="Confirmar senha"
            {...register('confirm', {
              required: 'Campo obrigatório',
              validate: (value) =>
                value == password.current || 'As senhas não conferem'
            })}
          />
          {errors.confirm && (
            <div className="invalid-feedback d-block" data-testid="to-error">
              {errors.confirm.message}
            </div>
          )}
          <IconShow
            errors={!!errors.confirm}
            errorPasswordMessage={errors?.confirm?.message}
            showPassword={values.showPassword2}
            handleClickPassword={handleClickPassword2}
            handleMouseDownPassword={handleMouseDownPassword}
          />
          <Link className="reset-link" to="..">
            Retornar a tela de login
          </Link>
          <div className="d-flex" style={{ marginBottom: '80px' }}>
            <ButtonLoader
              isLoading={isLoading}
              disabled={!!errors.password}
              change
            />
            <div className="btn-icon-content" data-testid="arrowIcon">
              <ArrowIcon />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reset
