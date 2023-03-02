import bcrypt from "bcrypt"

interface ValidationPasswordProps {
  bcryptPassword: string,
  password: string,
}

export async function validationPassword({ bcryptPassword, password }: ValidationPasswordProps) {
  const compare = await bcrypt.compare(bcryptPassword, password)
  
  return compare
}