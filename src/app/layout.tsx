"use client"
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/Basiclayout";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";
import ACCESS_ENUM from "@/access/accessEnum";

const InitLayout: React.FC<Readonly<{
  children: React.ReactNode;
}>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const doInit = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      //更新全局用户状态

    } else {
      // setTimeout(() => {
      //   const testUser = { userName: "测试登录", id: 1, userAvatar: "https://www.code-nav.cn/logo.png", userRole: ACCESS_ENUM.ADMIN }
      //   dispatch(setLoginUser(testUser))
      // }, 3000)
    }
  }, [])

  useEffect(() => {
    doInit();
  }, []);
  return children;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>

        </AntdRegistry>
      </body>
    </html>
  );
}

