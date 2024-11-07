"use client";
import { Avatar, Card, List, Typography } from "antd";
import "./index.css";
import Link from "next/link";
import TagList from "../TagList";
import MdViewer from "../MdViewer";
import Title from "antd/es/typography/Title";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题库卡片组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  useAddUserSignInRecord();

  return (
    <div className="question-card">
      <Card bordered={false}>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList}></TagList>
        <div style={{ marginBottom: 16 }}></div>
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="推荐答案" bordered={false}>
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
