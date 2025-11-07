import { supabase } from './client'

export interface SignUpCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface SignInCredentials {
  email: string
  password: string
}

// Vérifier si l'email est valide (@e-protect.fr)
export const isValidEmail = (email: string): boolean => {
  return email.endsWith('@e-protect.fr')
}

// Inscription
export const signUp = async ({ email, password, firstName, lastName }: SignUpCredentials) => {

    const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) throw error
  return data
}

// Connexion
export const signIn = async ({ email, password }: SignInCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

// Déconnexion
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Récupérer l'utilisateur actuel
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}