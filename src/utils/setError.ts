import { uiSetError } from '../redux/actions/ui'
import { store } from '../redux'

type ErrorType = {
  response?: {
    data?: {
      error?: string
    }
  }
}

export const setError = (error: ErrorType) => {
  console.log(error)
  console.log(error.response)
  const errorMessage: string | undefined = error.response?.data?.error
  store.dispatch(uiSetError(errorMessage ? errorMessage : 'Oops! Something bad happened :('))
}
