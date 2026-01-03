import { Formik, Form, Field } from "formik";
import type { UserFormValues } from "../type/user";
import { userFormikSchema } from "../schema/userSchema";
import { useUserUIStore } from "../../store/userStore";

type Props = {
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues, resetForm: () => void) => void;
  isLoading?: boolean;
};

export const UserForm = ({ initialValues, onSubmit, isLoading }: Props) => {
  const { toggle } = useUserUIStore();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userFormikSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values, resetForm);
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className="space-y-4 ">
          <div className="flex flex-col border w-1/2 mx-auto py-4 px-6 rounded bg-gray-200">
            <label className="mb-1 font-medium text-gray-700">
              First Name:
            </label>
            <Field
              name="firstName"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-red-600">
              {touched.firstName && errors.firstName}
            </p>
            <label className="mb-1 font-medium text-gray-700">Last Name:</label>
            <Field
              name="lastName"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.lastName && errors.lastName}
            <label className="mb-1 font-medium text-gray-700">Email:</label>
            <Field
              name="email"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.email && errors.email}
            <label className="mb-1 font-medium text-gray-700">Age:</label>
            <Field
              name="age"
              type="number"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.age && errors.age}

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {toggle ? "Edit" : "Add"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
