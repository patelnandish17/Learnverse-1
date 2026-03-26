import { z } from 'zod'

export const signupSchema = z.object({
  full_name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'One uppercase letter required')
    .regex(/[0-9]/, 'One number required'),
  confirm_password: z.string(),
}).refine(d => d.password === d.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})

export const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  session_id: z.string().uuid().optional(),
  context: z.string().max(200).optional(),
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput  = z.infer<typeof loginSchema>
export type ChatInput   = z.infer<typeof chatSchema>
