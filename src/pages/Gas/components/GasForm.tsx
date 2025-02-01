import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';

type FieldType = {
  commuteDistance?: number;
  milesPerGallon?: number;
  gasPricesAverage?: number;
};

export const GasForm: React.FC<{ gasPricesAverage: number|null}> = ({ gasPricesAverage }) => {
  const [form] = Form.useForm();
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const formLayout = 'horizontal';

  const calculateCost = (values: FieldType) => {
    const { commuteDistance, milesPerGallon, gasPricesAverage } = values;

    if (!commuteDistance ||!milesPerGallon ||!gasPricesAverage) {
      message.error("Please fill in all fields.");
      return;
    }

    if (commuteDistance <= 0 || milesPerGallon <= 0 || gasPricesAverage <= 0) {
      message.error("Please enter valid numbers (greater than zero).");
      return;
    }

    const gallonsNeeded = commuteDistance / milesPerGallon;
    const cost = gallonsNeeded * gasPricesAverage;
    setTotalCost(cost);
    form.setFieldsValue({ totalCost: cost });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error("Form submission failed. Please check the fields.");
  };

  return (
    <Form
      layout={formLayout}
      form={form}
      onFinish={calculateCost}
      onFinishFailed={onFinishFailed}
      initialValues={{ layout: formLayout }}
    >
      <Form.Item
        label="Commute Distance (miles)"
        name="commuteDistance"
        rules={[{ required: true, message: 'Please enter commute distance!' }]}
      >
        <InputNumber
          placeholder="e.g., 15"
          min={0}
          style={{ width: '100%' }} 
        />
      </Form.Item>

      <Form.Item
        label="Miles per gallon (MPG)"
        name="milesPerGallon"
        rules={[{ required: true, message: 'Please enter MPG!' }]}
      >
        <InputNumber
          placeholder="e.g., 25"
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Gas price"
        name="gasPricesAverage"
        rules={[{ required: true, message: 'Please enter gas price!' }]}
      >
        <InputNumber
            placeholder={gasPricesAverage !== null ? gasPricesAverage.toString() : "Fetching..."}
            min={0}
          style={{ width: '100%' }}
          step={0.01}
        />
      </Form.Item>

      {totalCost!== null && (
        <Form.Item label="Total Cost">
          <Input.Group>
            <Input style={{ width: 'calc(100% - 100px)' }} readOnly value={`$${totalCost.toFixed(2)}`} />
          </Input.Group>
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Calculate
        </Button>
      </Form.Item>
    </Form>
  );
};