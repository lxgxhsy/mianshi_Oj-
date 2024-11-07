"use client";

import {
  listQuestionVoByPageUsingPost,
  searchQuestionVoByPageUsingPost,
} from "@/api/questionController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";
import { initialize } from "next/dist/server/lib/render-server";
import Link from "next/link";

/**
 * 题目管理页面
 *
 * @constructor
 */

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  //默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
}
const QuestionTable: React.FC = (props: Props) => {
  const actionRef = useRef<ActionType>();
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  //题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || []
  );
  //题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  //用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
          // filterType: "light",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={{
          pageSize: 12,
          showTotal: (total) => `总共${total}条`,
          showSizeChanger: false,
          total,
        }}
        request={async (params, sort, filter) => {
          //减少服务端渲染耗费的时间
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";

          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
