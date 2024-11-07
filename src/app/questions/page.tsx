"use server";
import Title from "antd/es/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import "./index.css";
import {
  listQuestionVoByPageUsingPost,
  searchQuestionVoByPageUsingPost,
} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  //获取url的查询条件
  const { q: searchText } = searchParams;
  //题目列表和总数
  let questionList = [];
  // 题库数量不多，直接全量获取
  const pageSize = 12;
  let total = 0;

  try {
    const questionRes = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionRes.data.records ?? [];
    total = questionRes.data.total ?? 0;
  } catch (e) {
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
