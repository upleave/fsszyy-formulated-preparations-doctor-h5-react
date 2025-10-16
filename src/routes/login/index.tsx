import { createFileRoute } from "@tanstack/react-router";
import LoginField from "./-components/LoginInput";
import bannerImg from "@images/login/banner.jpg";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const LoginSchema = zod.object<{
    account: zod.ZodString;
    password: zod.ZodString;
  }>({
    account: zod.string().min(1, "请输入账号"),
    password: zod.string().min(1, "请输入密码"),
  });

  type LoginFormType = zod.infer<typeof LoginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(data: LoginFormType) {
    console.log(data);
  }

  function onValidError() {
    console.log("onValidError: ", isSubmitting, isValid, errors);
  }

  return (
    <div
      className="h-full pt-[300px] bg-no-repeat bg-[length:100%_470px] bg-white"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="px-[42px] pt-[68px] rounded-tl-[36px] rounded-tr-[36px] bg-white space-y-[48px]">
        <Controller
          name="account"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <LoginField
              label="账号"
              type="text"
              error={errors.account ? errors.account.message : undefined}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <LoginField
              label="密码"
              type="password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <button
          className="w-full mt-[64px] h-[98px] text-[32px] rounded-[16px] bg-[#2FA8BB] text-white active:bg-[#2098aa]"
          onClick={handleSubmit(onSubmit, onValidError)}
        >
          登录
        </button>
      </div>
    </div>
  );
}
