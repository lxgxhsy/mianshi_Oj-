import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {
  batchAddQuestionToBankUsingPost,
  batchRemoveQuestionToBankUsingPost,
} from "@/api/questionBankQuestionController";
import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

interface Props {
  questionIdList?: number[]; //旧数据
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量从题库删除题目所属弹窗

 * @param props
 * @constructor
 */
const BatchRemoveQuestionsFromBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (
    values: API.QuestionBankQuestionBatchRemoveRequest
  ) => {
    const hide = message.loading("正在操作");
    const questionBankId = values.questionBankId;
    if (!questionBankId) {
      return;
    }
    try {
      await batchRemoveQuestionToBankUsingPost({
        questionBankId,
        questionIdList,
      });
      hide();
      message.success("操作成功");
      onSubmit?.();
    } catch (e: any) {
      hide();
      message.error("操作失败，" + e.message);
    }
  };

  //獲取題目列表
  //获取所属题库列表
  const getQuestionBankList = async () => {
    const pageSize = 200;

    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (e) {
      console.error("获取题目列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={"批量向题库移除题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
        <Form.Item label="选择题库" name="questionBankId">
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
          />
        </Form.Item>
      </Form>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Modal>
  );
};
export default BatchRemoveQuestionsFromBankModal;
