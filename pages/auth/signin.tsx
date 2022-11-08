import { GetServerSideProps, NextPage } from 'next'
import { signIn, SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'


interface Props {
}



const SignIn: NextPage<Props> = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        signIn('credentials', {
            redirect: false,
            email: userData.email,
            password: userData.password,
            
        }).then((result: SignInResponse | undefined) => {
            if (result?.error) {
                setError(result?.error)
            }
            router.push("/dashboard")
        })

    }


    return (
        <div className='login_form'>

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="juan@perez.com"
                    onChange={({ target }) => setUserData({ ...userData, email: target.value })} />
                <input
                    type="password"
                    placeholder="******"
                    onChange={({ target }) => setUserData({ ...userData, password: target.value })} />
                <input type="submit" value="Login" />
                {
                    error ? (<div style={{ backgroundColor: "red", color: "white" }}>{error}</div>) : null
                }
            </form>
        </div>
    )
}


export default SignIn