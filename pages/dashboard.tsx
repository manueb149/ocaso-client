import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect } from 'react'


interface Props { }

const Dashboard: NextPage = (props) => {
    const { data, status } = useSession()

    useEffect(() => {
        if (status === "unauthenticated")
            Router.replace("/auth/signin")
    }, [status])

    const handleLogOut = () => {

        fetch('http://localhost:4000/v1/auth/logout',
            {
                method: 'POST',
                body: JSON.stringify({
                    'refreshToken': data ? data.user?.refreshToken : null
                })
            },
        ).then(() => signOut())
    }

    if (status === "authenticated")
        return (
            <div>
                welcome to the dashboard
                <button onClick={handleLogOut}>log outtt</button>
            </div>
        )

    return (
        <div>
            .....loading!
        </div>
    )
}


export default Dashboard