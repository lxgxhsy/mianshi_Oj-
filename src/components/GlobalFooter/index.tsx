import React, { useState } from 'react';
import './index.css';
/**
 * 
 * @returns 全体底部栏
 */

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (

    <div
      className="global-footer"
    >
      <div>© {currentYear} 面试刷题平台</div>
      <div>作者： 编程小将 sy</div>
    </div>
  );
};