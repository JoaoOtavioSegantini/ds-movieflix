import './styles.scss'

import { ReactComponent as MainImage } from '@images/login.svg'
import { ReactComponent as ArrowIcon } from '@images/arrow.svg'

import { useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { makeLogin, makeRequest } from '@utils/request'
import { saveSessionData } from '@utils/auth'
import Alert from '@components/Alert'
import ButtonLoader from '@components/ButtonLoader'
import IconShow from '@components/IconShow'
import Form from '@components/Form'
import { toast } from 'react-toastify'
// import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'

export type FormState = {
  username: string
  password: string
  to: string
  name: string
}

type LocationState = {
  from: string
}

// type Props = {
//   errors: DeepMap<FormState, FieldError>
//   register: UseFormRegister<FormState>
//   showText: boolean
//   children: React.ReactNode
//   isReset: boolean
//   hiddenPassword?: boolean
// }

// export const EmailPassword = (
//   errors: Props['errors'],
//   children: Props['children'],
//   register: Props['register'],
//   isReset: Props['isReset'],
//   showText: Props['showText'],
//   hiddenPassword = false
// ) => ({
//   email: {
//     type: 'email',
//     placeholder: 'Email',
//     className: `form-control d-flex ${errors.username ? 'is-invalid' : ''} `,
//     register: {
//       ...register(isReset ? 'to' : 'username', {
//         required: 'Campo obrigatório',
//         pattern: {
//           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//           message: 'Email inválido'
//         }
//       })
//     },
//     fieldError: errors.username ? (
//       <div className="invalid-feedback d-block" data-testid="username-error">
//         {errors?.username!.message}
//       </div>
//     ) : null,
//     fieldReset:
//       isReset && errors.to ? (
//         <div className="invalid-feedback d-block" data-testid="to-error">
//           {errors.to.message}
//         </div>
//       ) : null
//   },
//   password: {
//     hidden: isReset || hiddenPassword,
//     principal: (
//       <div className="group ">
//         <input
//           className={`form-control col ${errors.password ? 'is-invalid' : ''} `}
//           type={showText ? 'text' : 'password'}
//           placeholder="Senha"
//           {...register('password', {
//             required: 'Campo obrigatório'
//           })}
//         />

//         {children}
//       </div>
//     )
//   }
// })

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
  const [isReset, setIsReset] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleClickPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const { from } = location.state || { from: { pathname: '/movies' } }

  const onSubmit = (data: FormState) => {
    setIsLoading(true)
    isSignUp
      ? makeRequest({
          url: '/users',
          method: 'POST',
          data: {
            email: data.username,
            name: data.name,
            password: data.password,
            roles: [{ id: 1 }]
          }
        })
          .then(() => {
            setIsLoading(false)
            toast.success('Cadastro efetuado com sucesso!')
          })
          .catch((err) => {
            if (err.response.data.message === '') {
              toast.error(err.response.data.error)
            } else {
              toast.error(err.response?.data.message)
            }
            setIsLoading(false)
          })
      : isReset
      ? makeRequest({
          url: '/emails',
          method: 'POST',
          data: { to: data.to },
          headers: { 'content-type': 'application/json' }
        })
          .then(() => {
            setIsLoading(false)
            toast.success(
              'Token de reset enviado, por favor verifique seu email.'
            )
          })
          .catch((err) => {
            toast.error(err.response?.data.message)
            setIsLoading(false)
          })
      : makeLogin(data)
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
          <h1 className="login-title">
            {isReset ? 'RECUPERAR' : isSignUp ? 'CADASTRO' : 'LOGIN'}
          </h1>
          {hasError && <Alert onClick={() => setHasError(false)} />}
          <Form
            errors={errors}
            register={register}
            showText={values.showPassword}
            isReset={isReset}
            isSignUp={isSignUp}
          >
            <IconShow
              errors={!!errors.password}
              errorPasswordMessage={errors?.password?.message}
              showPassword={values.showPassword}
              handleClickPassword={handleClickPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Form>
          <a
            onClick={() => {
              setIsReset(!isReset)
              errors.password = undefined
              errors.to = undefined
              errors.username = undefined
              errors.name = undefined
              setIsSignUp(false)
            }}
            className="reset-link"
          >
            {!isReset ? 'Esqueceu sua senha ?' : 'Retornar a tela de login'}
          </a>
          <div className="d-flex">
            <ButtonLoader
              isLoading={isLoading}
              disabled={!!errors.password || !!errors.username}
              isReset={isReset}
              isSignUp={isSignUp}
            />
            <div className="btn-icon-content" data-testid="arrowIcon">
              <ArrowIcon />
            </div>
          </div>
          <a className="sign-btn">
            {isSignUp ? 'Já tem Cadastro?' : 'Não tem Cadastro?'}
            &nbsp;&nbsp;&nbsp;
            <span
              onClick={() => {
                setIsSignUp(!isSignUp)
                setIsReset(false)
                errors.password = undefined
                errors.to = undefined
                errors.username = undefined
                errors.name = undefined
              }}
            >
              {isSignUp ? 'LOGIN' : 'CADASTRAR'}
            </span>
          </a>
        </form>
      </div>
    </div>
  )
}

export default Home
