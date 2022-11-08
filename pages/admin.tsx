

import { NextPage } from 'next'
import { useSession } from 'next-auth/react'


interface Props { }

const Admin: NextPage<Props> = (props) => {
  const { data, status } = useSession()


  return (
    <div>
      AaaaaDmin
    </div>
  )
}


export default Admin