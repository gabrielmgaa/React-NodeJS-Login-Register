import bcrypt from "bcrypt"

interface ValidationPassword {
  bcryptPassword: string,
  password: string
}

export async function validationPassword({ bcryptPassword, password }: ValidationPassword) {
  const compare = await bcrypt.compare(bcryptPassword, password)

  return compare
}
