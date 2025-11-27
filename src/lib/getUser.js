import { cookies } from 'next/headers'

export async function getUser() {
  const token = cookies().get('payload-token')

  if (!token) return null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token.value}`,
      },
    })

    if (response.ok) {
      const { user } = await response.json()
      return user
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }

  return null
}
