import { createFileRoute } from "@tanstack/react-router";
import LoginField from "./-components/LoginInput";
import bannerImg from "@images/login/banner.jpg";
import * as zod from "zod";
import { useInput } from "@/hooks/useInput";
import { useState } from "react";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});
function RouteComponent() {
  const LoginSchema = zod.object({
    account: zod.string().min(1, "请输入账号"),
    password: zod.string().min(1, "请输入密码"),
  });

  const [account, changeAccount] = useInput("");
  const [password, changePassword] = useInput("");

  const [rules, setRules] = useState<Record<string, string>>({});

  function handleSubmit() {
    const res = LoginSchema.safeParse({
      account,
      password,
    });
    if (!res.success) {
      res.error.issues.forEach((item) => {
        console.log(item);
        setRules((prev) => ({
          ...prev,
          [item.path[0]]: item.message,
        }));
      });
      // todo
    } else {
      console.log(res);
    }
  }

  return (
    <div
      className='h-full pt-[300px] bg-no-repeat bg-[length:100%_470px] bg-white'
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className='px-[42px] pt-[68px] rounded-tl-[36px] rounded-tr-[36px] bg-white space-y-[48px]'>
        <LoginField
          label='账号'
          name='account'
          type='text'
          value={account}
          onChange={changeAccount}
          error={rules.account}
        />
        <LoginField
          label='密码'
          name='password'
          type='password'
          value={password}
          onChange={changePassword}
          error={rules.password}
        />
        <button
          className='w-full mt-[64px] h-[98px] text-[32px] rounded-[16px] bg-[#2FA8BB] text-white active:bg-[#2098aa]'
          onClick={handleSubmit}
        >
          登录
        </button>
      </div>
    </div>
  );
}
