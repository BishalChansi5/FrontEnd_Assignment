import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const userZodSchema = z.object({
  firstName: z
    .string("First name is required")
    .min(3, "Minimum 3 characters are required"),
  lastName: z
    .string("Last name is required")
    .min(3, "Minimum 3 characters are required"),

  email: z.string("Email is required").email("Invalid email"),
  age: z
    .union([
      z.number().min(18, "Must be at least 18"),
      z.string().length(0, "Required"),
    ])
    .optional(),
  //   age: z.number().min(18, "Must be at least 18").optional().or(z.literal("")),
});

export const userFormikSchema = toFormikValidationSchema(userZodSchema);
