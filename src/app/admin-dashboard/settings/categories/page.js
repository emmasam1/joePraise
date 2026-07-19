"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Dropdown,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  SaveOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";

const CategoryManagement = () => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([
    {
      key: 1,
      name: "Beauty & Personal Care",
      total: 4,
      createdAt: "19/12/2025",
    },
    {
      key: 2,
      name: "Fashion & Apparel",
      total: 7,
      createdAt: "19/12/2025",
    },
    {
      key: 3,
      name: "Electronics & Gadgets",
      total: 8,
      createdAt: "19/12/2025",
    },
    {
      key: 4,
      name: "Food & Groceries",
      total: 3,
      createdAt: "19/12/2025",
    },
    {
      key: 5,
      name: "Home & Living",
      total: 5,
      createdAt: "19/12/2025",
    },
    {
      key: 6,
      name: "Health & Fitness",
      total: 6,
      createdAt: "19/12/2025",
    },
    {
      key: 7,
      name: "Books",
      total: 2,
      createdAt: "19/12/2025",
    },
    {
      key: 8,
      name: "Joe's Kitchen",
      total: 6,
      createdAt: "19/12/2025",
    },
  ]);

  const subCategories = {
    "Beauty & Personal Care": [
      {
        id: 1,
        name: "Skincare",
        total: 4,
      },
      {
        id: 2,
        name: "Haircare & Styling",
        total: 6,
      },
      {
        id: 3,
        name: "Makeup & Cosmetics",
        total: 3,
      },
    ],

    "Fashion & Apparel": [
      {
        id: 1,
        name: "Men's Fashion",
        total: 12,
      },
      {
        id: 2,
        name: "Women's Fashion",
        total: 9,
      },
    ],

    "Electronics & Gadgets": [
      {
        id: 1,
        name: "Phones",
        total: 18,
      },
      {
        id: 2,
        name: "Computers",
        total: 10,
      },
    ],
  };

  const handleView = (record) => {
    setSelectedCategory(record);
    setShowSubCategories(true);
  };

  const handleCreateCategory = (values) => {
    setLoading(true);

    setTimeout(() => {
      setCategories((prev) => [
        {
          key: Date.now(),
          name: values.category,
          total: 0,
          createdAt: new Date().toLocaleDateString(),
        },
        ...prev,
      ]);

      message.success("Category created successfully");

      form.resetFields();
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  const columns = [
    {
      title: "MAIN CATEGORY",
      dataIndex: "name",
      render: (text) => (
        <div className="flex items-center gap-2 font-semibold">
          <AppstoreOutlined />
          {text}
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
    },
    {
      title: "DATE CREATED",
      dataIndex: "createdAt",
    },
    {
      title: "ACTION",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                label: <span onClick={() => handleView(record)}>View</span>,
              },
              {
                key: "2",
                icon: <EditOutlined />,
                label: "Edit",
              },
              {
                key: "3",
                danger: true,
                icon: <DeleteOutlined />,
                label: "Delete",
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const subColumns = [
    {
      title: "SUB CATEGORY",
      dataIndex: "name",
      render: (text) => (
        <div className="flex items-center gap-2 font-semibold">
          <AppstoreOutlined />
          {text}
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
    },
  ];

  return (
    <>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <h2 className="text-lg font-bold text-black">Category Management</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          className="bg-[#060853] h-11 px-8 border-none rounded-md"
        >
          Add
        </Button>
      </div>
      <Card className="rounded-xl" bodyStyle={{ padding: 20 }}>
  {!showSubCategories ? (
    <>
      {/* Categories Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h3 className="font-semibold flex items-center gap-2">
          <AppstoreOutlined />
          Categories
        </h3>

        <Space>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-72 h-10"
          />

          <Button
            icon={<FilterOutlined />}
            className="h-10"
          />
        </Space>
      </div>

      {/* Categories Table */}

      <Table
        columns={columns}
        dataSource={categories}
        pagination={{
          pageSize: 8,
        }}
      />
    </>
  ) : (
    <>
      {/* Sub Category Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div
          onClick={() => setShowSubCategories(false)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <PlusOutlined
            rotate={45}
            className="text-[#060853] text-xs"
          />

          <span className="font-bold text-black">
            {selectedCategory?.name}
          </span>
        </div>

        <Space>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-72 h-10"
          />

          <Button
            icon={<FilterOutlined />}
            className="h-10"
          />
        </Space>
      </div>

      {/* Sub Category Table */}

      <Table
        rowKey="id"
        columns={subColumns}
        dataSource={subCategories[selectedCategory?.name] || []}
        pagination={false}
      />
    </>
  )}
</Card>

      {/* ========================= */}
      {/* ADD CATEGORY MODAL */}
      {/* ========================= */}

      <Modal
        open={open}
        footer={null}
        centered
        width={500}
        onCancel={() => setOpen(false)}
        title={
          <div>
            <h2 className="text-xl font-bold">Add Category</h2>
          </div>
        }
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateCategory}
          className="mt-6"
        >
          <Form.Item
            label="Category Name"
            name="category"
            rules={[
              {
                required: true,
                message: "Category name is required",
              },
            ]}
          >
            <Input placeholder="e.g Electronics & Gadgets" className="h-11" />
          </Form.Item>

          <Form.Item label="Sub Category" name="subCategory">
            <Input placeholder="e.g Electronics & Gadgets" className="h-11" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={() => setOpen(false)} className="px-8">
              Cancel
            </Button>

            <Button
              htmlType="submit"
              loading={loading}
              type="primary"
              icon={<SaveOutlined />}
              className="bg-[#060853] border-none px-8"
            >
              Save Category
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryManagement;
