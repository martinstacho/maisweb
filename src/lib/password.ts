export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (password.length < 8) errors.push('Heslo musí mať aspoň 8 znakov')
  if (!/[A-Z]/.test(password)) errors.push('Heslo musí obsahovať veľké písmeno')
  if (!/[a-z]/.test(password)) errors.push('Heslo musí obsahovať malé písmeno')
  if (!/[0-9]/.test(password)) errors.push('Heslo musí obsahovať číslo')
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Heslo musí obsahovať špeciálny znak')
  return { valid: errors.length === 0, errors }
}
