import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const schema = z.object({
  firstName: z.string().nonempty("Required").min(3, "minimum 3 are required"),
  lastName: z.string().min(3),
  email: z.string().email(),
});

const validationSchema = toFormikValidationSchema(schema);

export const From = () => (
  <Formik
    initialValues={{ firstName: "n", lastName: "", email: "" }}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log(values)}
  >
    {({ errors, touched }) => (
      <Form>
        <label>First Name</label>
        <Field name="firstName" type="text" className="border" />
        <ErrorMessage name="firstName" />

        <label>Last Name</label>
        <Field name="lastName" type="text" className="border" />
        {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}

        <label>Email</label>
        <Field name="email" type="email" className="border" />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);
