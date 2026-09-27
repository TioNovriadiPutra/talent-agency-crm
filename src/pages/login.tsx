import { Button, Flex, TextInput } from "@/components/shared";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

function Login() {
  const { control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Flex className="flex-1 items-center justify-center bg-white">
      <Flex className="w-100 p-5 border border-neutral-200 rounded-2xl gap-16">
        <Flex className="items-center gap-3.5">
          <h1 className="text-neutral-900">Sign In</h1>

          <p className="text-body-s text-center text-neutral-500 max-w-84">
            Masukan email dan password yang telah terdaftar untuk masuk
          </p>
        </Flex>

        <form className="flex flex-col gap-12">
          <Flex className="gap-6">
            <Controller
              control={control}
              name="email"
              render={({ field }) => <TextInput field={field} label="Email" />}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextInput field={field} label="Password" type="password" />
              )}
            />

            <Flex className="items-end">
              <Link href="#" className="text-body-s text-neutral-500 underline">
                Lupa Password?
              </Link>
            </Flex>
          </Flex>

          <Button type="submit" size="large" label="Sign In" />
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
