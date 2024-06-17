import { auth } from "@/auth.config"
import { Title } from "@/components"

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div>
      <Title title='Profile' />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <p>{session?.user.role}</p>
    </div>
  )
}
