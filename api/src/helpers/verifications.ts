interface UserProps {
  name: string,
  email: string,
  password: string,
}

export function VerifyAllInformations(user: UserProps){
  if (user.name.length < 5 || user.email.length < 15 || user.password.length < 8) {
    return (
      {
        msg: 'You must provide all the informations required'
      }
    )
  }
}

// res.status(400).json({ msg: 'You must provide all the informations required' })