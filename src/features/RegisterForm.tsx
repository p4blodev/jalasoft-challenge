import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterFormTypes } from './RegisterForm.types';

const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
};

const messages = {
  usernameRequired: ' * Username is required',
  emailRquired: ' * Email Address is required',
  emailFormat: ' * Invalid email format',
  passwordRequired: ' * Password is required',
  passwordFormat: ' * Invalid password format',
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormTypes>();

  const onSubmit: SubmitHandler<RegisterFormTypes> = (data) =>
    console.log(data);

  return (
    <>
      <h1>Register form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: messages.usernameRequired,
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: messages.emailRquired,
              pattern: {
                value: patterns.email,
                message: messages.emailFormat,
              },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: messages.passwordRequired,
              pattern: {
                value: patterns.password,
                message: messages.passwordFormat,
              },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Send data</button>
      </form>
    </>
  );
};
