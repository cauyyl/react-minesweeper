"use client";
import React from "react";
import useFormChange from "./useFormChange";
import { Input, Radio, Select } from "antd";

function index() {
  const [formData, setFormItem, reset] = useFormChange();
  const { name, options, select } = formData;
  return (
    <div>
      <div className="des">文本框</div>
      <Input
        name="value1"
        title="名称"
        type="text"
        placeholder="请输入名称"
        value={name}
        onChange={value => setFormItem("name", value)}
      />
      <div className="des">单选</div>
      <Radio.Group
        onChange={e => {
          setFormItem("options", e.target.value);
        }}
        value={options}
      >
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>

      <div className="des">下拉框</div>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={value => {
          setFormItem("select", value);
        }}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },

          {
            value: "Yiminghe",
            label: "yiminghe",
          },
        ]}
      />
      <div>当前选择:{select}</div>

      <div className="btns">
        {/*<AtButton type="primary" onClick={() => console.log(formData)}>*/}
        {/*  提交*/}
        {/*</AtButton>*/}
        {/*<AtButton className="reset" onClick={reset}>*/}
        {/*  重置*/}
        {/*</AtButton>*/}
      </div>
    </div>
  );
}

export default index;
