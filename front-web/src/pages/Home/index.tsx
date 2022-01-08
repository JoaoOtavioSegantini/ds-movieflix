import './styles.scss'

import { ReactComponent as MainImage } from '@images/login.svg'
import { ReactComponent as ArrowIcon } from '@images/arrow.svg'

import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { makeLogin } from '@utils/request'
import { saveSessionData } from '@utils/auth'
import Alert from '@components/Alert'
import ButtonLoader from '@components/ButtonLoader'
import IconShow from '@components/IconShow'
import Form from '@components/Form'
import { toast } from 'react-toastify'

export type FormState = {
  username: string
  password: string
}

type LocationState = {
  from: string
}

const Home = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormState>()

  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const location = useLocation<LocationState>()

  const handleClickPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const { from } = location.state || { from: { pathname: '/movies' } }

  const onSubmit = (data: FormState) => {
    setIsLoading(true)
    makeLogin(data)
      .then((response) => {
        setHasError(false)

        setIsLoading(false)
        saveSessionData(response.data)
        history.replace(from)
        setTimeout(() => {
          toast.success(`Bem vindo de volta ${response.data.userName}!`)
        }, 1500)
      })
      .catch((err) => {
        toast.error(err)
        setHasError(true)
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
        <form className="col-6 login-base" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login-title">LOGIN</h1>
          {hasError && <Alert onClick={() => setHasError(false)} />}
          <Form
            errors={errors}
            register={register}
            showText={values.showPassword}
          >
            <IconShow
              errors={!!errors.password}
              errorPasswordMessage={errors?.password?.message}
              showPassword={values.showPassword}
              handleClickPassword={handleClickPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Form>
          <div className="d-flex">
            <ButtonLoader
              isLoading={isLoading}
              disabled={!!errors.password || !!errors.username}
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

export default Home
