"use client"
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  ProLayout,
} from '@ant-design/pro-components';
import Image from 'next/image';
import {
  Dropdown,
  Input,
  theme,
} from 'antd';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import GlobalFooter from '@/components/GlobalFooter';
import './index.css';
import menus from '../../../config/menus';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';


const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={
          <SearchOutlined />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  return (
    <div
      id="basicLayout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProLayout
        title="面试刷题网站"
        logo={
          <Image src="/assets/logo.png" height={32} width={32} alt="面试鸭刷题网站 - sy" />
        }
        layout="top"
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: 'small',
          title: loginUser.userName || "sy",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录',
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a key="github" href="https://github.com/lxgxhsy/mianshi_Oj-" target="_blank">
              <GithubFilled key="GithubFilled" />
            </a>
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        //渲染底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 菜单项数据
        menuDataRender={() => {
          return menus;
        }}
        menuItemRender={(item, dom) => (
          <Link
            href={item.path || "/"}
            target={item.target}
          >
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
};