"use client"

import { updateUserRole } from "@/actions"
import type { User } from "@/interfaces"
import { useSession } from "next-auth/react"

interface Props {
  users: User[]
}

export const UsersTable = ({ users }: Props) => {
  const { update } = useSession()

  const onRoleChange = (user: User, role: string) => {
    updateUserRole(user.id, role)
    update({ user: user.email, data: { role } })
  }

  return (
    <table className='min-w-full'>
      <thead className='bg-gray-200 border-b'>
        <tr>
          <th
            scope='col'
            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Email
          </th>
          <th
            scope='col'
            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Name
          </th>
          <th
            scope='col'
            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
          >
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
              {user.email}
            </td>
            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
              {user.name}
            </td>
            <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
              <select
                onChange={(e) => onRoleChange(user, e.target.value)}
                className='text-sm w-full p-2 text-gray-900'
                value={user.role}
                name='role'
                id='role'
              >
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
