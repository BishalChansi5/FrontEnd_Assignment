import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const userZodSchema = z.object({
  firstName: z
    .string()
    .nonempty("First Name is required")
    .min(3, "Minimum 3 characters"),
  lastName: z.string().min(3, "Minimum 3 characters"),

  email: z.string().email("Invalid email"),
//   age: z
//     .union([
//       z.number().min(18, "Must be at least 18"),
//       z.string().length(0, "Required"),
//     ])
//     .optional(),
  //   age: z.number().min(18, "Must be at least 18").optional().or(z.literal("")),
});

export const userFormikSchema = toFormikValidationSchema(userZodSchema);
