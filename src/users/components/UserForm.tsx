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
      {({ errors, touched }) => {
        console.log(errors);
        return (
          <Form className="space-y-4 ">
            <div className="flex flex-col border w-1/2 mx-auto py-4 px-6 rounded bg-gray-950">
              <label className="mb-1 font-medium text-white">First Name:</label>
              <Field
                name="firstName"
                className="bg-white outline-none p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-red-600">
                {touched.firstName && errors.firstName}
              </p>
              <label className="mb-1 font-medium text-white">Last Name:</label>
              <Field
                name="lastName"
                className="bg-white p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-red-600">
                {touched.lastName && errors.lastName}
              </p>
              <label className="mb-1 font-medium text-white">Email:</label>
              <Field
                name="email"
                className="bg-white p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-red-600">{touched.email && errors.email}</p>
              <label className="mb-1 font-medium text-white">Age:</label>
              <Field
                name="age"
                type="number"
                className="bg-white p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-red-600">{touched.age && errors.age}</p>

              <button
                type="submit"
                disabled={isLoading}
                className={` ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 cursor-pointer hover:bg-blue-600 transition"
                } px-4 py-2 mt-2  text-white rounded `}
              >
                {toggle ? "Edit" : "Add"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
