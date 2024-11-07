import "./index.css";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import message from "antd/es/message";
import { getUserSignInRecordUsingGet } from "@/api/userController";

interface Props {}

/**
 * 刷题日历图
 * @param props
 * @constructor
 */
const CalendarChart = (props: Props) => {
  const {} = props;
  const [dataList, setDataList] = useState<number[]>([]);
  //计算图表所需要的数据
  const year = new Date().getFullYear();

  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordUsingGet({
        year,
      });
    } catch (e) {
      message.error("获取刷题签到记录失败" + e.message);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const optionsData = dataList.map((dayOfYear) => {
    const dataStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dataStr, 1];
  });

  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // 单元格自动宽度，高度为 16 像素
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className="calendar-chart" option={options} />;
};

export default CalendarChart;
