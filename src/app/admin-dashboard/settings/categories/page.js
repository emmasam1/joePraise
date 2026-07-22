// "use client";

// import { useState } from "react";
// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   Modal,
//   Space,
//   Table,
//   Dropdown,
//   message,
// } from "antd";
// import {
//   PlusOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   MoreOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   AppstoreOutlined,
//   SaveOutlined,
//   ArrowLeftOutlined
// } from "@ant-design/icons";

// const CategoryManagement = () => {
//   const [form] = Form.useForm();

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [showSubCategories, setShowSubCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [categories, setCategories] = useState([
//     {
//       key: 1,
//       name: "Beauty & Personal Care",
//       total: 4,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 2,
//       name: "Fashion & Apparel",
//       total: 7,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 3,
//       name: "Electronics & Gadgets",
//       total: 8,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 4,
//       name: "Food & Groceries",
//       total: 3,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 5,
//       name: "Home & Living",
//       total: 5,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 6,
//       name: "Health & Fitness",
//       total: 6,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 7,
//       name: "Books",
//       total: 2,
//       createdAt: "19/12/2025",
//     },
//     {
//       key: 8,
//       name: "Joe's Kitchen",
//       total: 6,
//       createdAt: "19/12/2025",
//     },
//   ]);

//   const subCategories = {
//     "Beauty & Personal Care": [
//       {
//         id: 1,
//         name: "Skincare",
//         total: 4,
//       },
//       {
//         id: 2,
//         name: "Haircare & Styling",
//         total: 6,
//       },
//       {
//         id: 3,
//         name: "Makeup & Cosmetics",
//         total: 3,
//       },
//     ],

//     "Fashion & Apparel": [
//       {
//         id: 1,
//         name: "Men's Fashion",
//         total: 12,
//       },
//       {
//         id: 2,
//         name: "Women's Fashion",
//         total: 9,
//       },
//     ],

//     "Electronics & Gadgets": [
//       {
//         id: 1,
//         name: "Phones",
//         total: 18,
//       },
//       {
//         id: 2,
//         name: "Computers",
//         total: 10,
//       },
//     ],
//   };

//   const handleView = (record) => {
//     setSelectedCategory(record);
//     setShowSubCategories(true);
//   };

//   const handleCreateCategory = (values) => {
//     setLoading(true);

//     setTimeout(() => {
//       setCategories((prev) => [
//         {
//           key: Date.now(),
//           name: values.category,
//           total: 0,
//           createdAt: new Date().toLocaleDateString(),
//         },
//         ...prev,
//       ]);

//       message.success("Category created successfully");

//       form.resetFields();
//       setLoading(false);
//       setOpen(false);
//     }, 1000);
//   };

//   const columns = [
//     {
//       title: "MAIN CATEGORY",
//       dataIndex: "name",
//       render: (text) => (
//         <div className="flex items-center gap-2 font-semibold">
//           <AppstoreOutlined />
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: "TOTAL",
//       dataIndex: "total",
//     },
//     {
//       title: "DATE CREATED",
//       dataIndex: "createdAt",
//     },
//     {
//       title: "ACTION",
//       render: (_, record) => (
//         <Dropdown
//           trigger={["click"]}
//           menu={{
//             items: [
//               {
//                 key: "1",
//                 label: <span onClick={() => handleView(record)}>View</span>,
//               },
//               {
//                 key: "2",
//                 icon: <EditOutlined />,
//                 label: "Edit",
//               },
//               {
//                 key: "3",
//                 danger: true,
//                 icon: <DeleteOutlined />,
//                 label: "Delete",
//               },
//             ],
//           }}
//         >
//           <Button type="text" icon={<MoreOutlined />} />
//         </Dropdown>
//       ),
//     },
//   ];

//   const subColumns = [
//     {
//       title: "SUB CATEGORY",
//       dataIndex: "name",
//       render: (text) => (
//         <div className="flex items-center gap-2 font-semibold">
//           <AppstoreOutlined />
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: "TOTAL",
//       dataIndex: "total",
//     },
//   ];

//   return (
//     <>
//       {/* Header */}

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
//         <h2 className="text-lg font-bold text-black">Category Management</h2>

//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => setOpen(true)}
//           className="bg-[#060853] h-11 px-8 border-none rounded-md"
//         >
//           Add
//         </Button>
//       </div>
//       <Card className="rounded-xl" bodyStyle={{ padding: 20 }}>
//   {!showSubCategories ? (
//     <>
//       {/* Categories Header */}

//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//         <h3 className="font-semibold flex items-center gap-2">
//           <AppstoreOutlined />
//           Categories
//         </h3>

//         <Space>
//           <Input
//             placeholder="Search"
//             prefix={<SearchOutlined />}
//             className="w-72 h-10"
//           />

//           <Button
//             icon={<FilterOutlined />}
//             className="h-10"
//           />
//         </Space>
//       </div>

//       {/* Categories Table */}

//       <Table
//         columns={columns}
//         dataSource={categories}
//         pagination={{
//           pageSize: 8,
//         }}
//       />
//     </>
//   ) : (
//     <>
//       {/* Sub Category Header */}

//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         <div
//           onClick={() => setShowSubCategories(false)}
//           className="flex items-center gap-2 cursor-pointer"
//         >
//           <PlusOutlined
//             rotate={45}
//             className="text-[#060853] text-xs"
//           />

//           <span className="font-bold text-black">
//             {selectedCategory?.name}
//           </span>
//         </div>

//         <Space>
//           <Input
//             placeholder="Search"
//             prefix={<SearchOutlined />}
//             className="w-72 h-10"
//           />

//           <Button
//             icon={<FilterOutlined />}
//             className="h-10"
//           />
//         </Space>
//       </div>

//       {/* Sub Category Table */}

//       <Table
//         rowKey="id"
//         columns={subColumns}
//         dataSource={subCategories[selectedCategory?.name] || []}
//         pagination={false}
//       />
//     </>
//   )}
// </Card>

//       {/* ========================= */}
//       {/* ADD CATEGORY MODAL */}
//       {/* ========================= */}

//       <Modal
//         open={open}
//         footer={null}
//         centered
//         width={500}
//         onCancel={() => setOpen(false)}
//         title={
//           <div>
//             <h2 className="text-xl font-bold">Add Category</h2>
//           </div>
//         }
//       >
//         <Form
//           layout="vertical"
//           form={form}
//           onFinish={handleCreateCategory}
//           className="mt-6"
//         >
//           <Form.Item
//             label="Category Name"
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Category name is required",
//               },
//             ]}
//           >
//             <Input placeholder="e.g Electronics & Gadgets" className="h-11" />
//           </Form.Item>

//           <Form.Item label="Sub Category" name="subCategory">
//             <Input placeholder="e.g Electronics & Gadgets" className="h-11" />
//           </Form.Item>

//           <div className="flex justify-end gap-3 mt-8">
//             <Button onClick={() => setOpen(false)} className="px-8">
//               Cancel
//             </Button>

//             <Button
//               htmlType="submit"
//               loading={loading}
//               type="primary"
//               icon={<SaveOutlined />}
//               className="bg-[#060853] border-none px-8"
//             >
//               Save Category
//             </Button>
//           </div>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default CategoryManagement;


"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Dropdown,
  Switch,
  Segmented,
  Skeleton,
  Empty,
  Tag,
  Upload,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  ShopOutlined,
  TagsOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useCategoryStore } from "@/store/categoryStore";

const CategoryManagement = () => {
  const [form] = Form.useForm();

  const {
    categories,
    categoriesLoading,
    mutating,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();

  const [activeType, setActiveType] = useState("business");
  const [searchTerm, setSearchTerm] = useState("");

  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [editingCategory, setEditingCategory] = useState(null);
  const [addingSubTo, setAddingSubTo] = useState(null); // category to add sub-category under
  const [iconFile, setIconFile] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories(activeType);
    setShowSubCategories(false);
    setSelectedCategory(null);
  }, [activeType]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- Modal handlers ---
  const openAddModal = (parentCategory = null) => {
    setModalMode("add");
    setEditingCategory(null);
    setAddingSubTo(parentCategory);
    setIconFile(null);
    form.resetFields();
    if (parentCategory) {
      form.setFieldsValue({ parentCategory: parentCategory._id });
    }
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setModalMode("edit");
    setEditingCategory(category);
    setAddingSubTo(null);
    setIconFile(null);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
      parentCategory: category.parentCategory || undefined,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    form.resetFields();
    setIconFile(null);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        sortOrder: values.sortOrder,
        type: activeType,
        parentCategory: values.parentCategory || "",
      };

      if (iconFile) {
        payload.icon = iconFile;
      }

      if (modalMode === "add") {
        await createCategory(payload);
      } else {
        await updateCategory(editingCategory._id, {
          ...payload,
          isActive: values.isActive,
        });
      }

      closeModal();
      fetchCategories(activeType);
    } catch {
      // error already surfaced via message in the store
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await updateCategory(category._id, { isActive: !category.isActive });
      fetchCategories(activeType);
    } catch {
      // handled
    }
  };

  const confirmDelete = (category) => {
    setDeleteTarget(category);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget._id);
      setDeleteModalOpen(false);
      setDeleteTarget(null);
      if (selectedCategory?._id === deleteTarget._id) {
        setShowSubCategories(false);
        setSelectedCategory(null);
      }
      fetchCategories(activeType);
    } catch {
      // handled
    }
  };

  const handleView = (record) => {
    setSelectedCategory(record);
    setShowSubCategories(true);
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-GB") : "—";

  const topLevelOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  // --- Table columns ---
  const columns = [
    {
      title: "MAIN CATEGORY",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3 font-semibold">
          {record.icon?.url ? (
            <img src={record.icon.url} alt="" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#060853]">
              <AppstoreOutlined className="text-xs" />
            </div>
          )}
          {text}
          {!record.isActive && (
            <Tag color="default" className="text-[10px]">
              Inactive
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: activeType === "business" ? "BUSINESSES" : "PRODUCTS/SERVICES",
      dataIndex: "itemCount",
      render: (count) => <span className="font-semibold text-[#060853]">{count || 0}</span>,
    },
    {
      title: "SUB-CATEGORIES",
      dataIndex: "subCategories",
      render: (subs) => <span>{subs?.length || 0}</span>,
    },
    {
      title: "DATE CREATED",
      dataIndex: "createdAt",
      render: formatDate,
    },
    {
      title: "ACTION",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              { key: "view", label: "View Sub-Categories", onClick: () => handleView(record) },
              { key: "add-sub", label: "Add Sub-Category", onClick: () => openAddModal(record) },
              { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: () => openEditModal(record) },
              {
                key: "toggle",
                label: record.isActive ? "Deactivate" : "Activate",
                onClick: () => handleToggleActive(record),
              },
              {
                key: "delete",
                danger: true,
                icon: <DeleteOutlined />,
                label: "Delete",
                onClick: () => confirmDelete(record),
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
      render: (text, record) => (
        <div className="flex items-center gap-3 font-semibold">
          {record.icon?.url ? (
            <img src={record.icon.url} alt="" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#060853]">
              <TagsOutlined className="text-xs" />
            </div>
          )}
          {text}
          {!record.isActive && (
            <Tag color="default" className="text-[10px]">
              Inactive
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: activeType === "business" ? "BUSINESSES" : "PRODUCTS/SERVICES",
      dataIndex: "itemCount",
      render: (count) => <span className="font-semibold text-[#060853]">{count || 0}</span>,
    },
    {
      title: "DATE CREATED",
      dataIndex: "createdAt",
      render: formatDate,
    },
    {
      title: "ACTION",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: () => openEditModal(record) },
              {
                key: "toggle",
                label: record.isActive ? "Deactivate" : "Activate",
                onClick: () => handleToggleActive(record),
              },
              {
                key: "delete",
                danger: true,
                icon: <DeleteOutlined />,
                label: "Delete",
                onClick: () => confirmDelete(record),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
        <div>
          <h2 className="text-lg font-bold text-black">Category Management</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage categories used across business onboarding and product/service listings.
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openAddModal(null)}
          className="bg-[#060853]! h-11! px-8! border-none! rounded-md!"
        >
          Add Category
        </Button>
      </div>

      {/* Type switcher */}
      <div className="mb-6">
        <Segmented
          value={activeType}
          onChange={setActiveType}
          size="large"
          options={[
            {
              label: (
                <div className="flex items-center gap-2 px-2 py-1">
                  <ShopOutlined /> Business Categories
                </div>
              ),
              value: "business",
            },
            {
              label: (
                <div className="flex items-center gap-2 px-2 py-1">
                  <TagsOutlined /> Listing Categories
                </div>
              ),
              value: "listing",
            },
          ]}
        />
      </div>

      <Card className="rounded-xl" styles={{ body: { padding: 20 } }}>
        <AnimatePresence mode="wait">
          {!showSubCategories ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <AppstoreOutlined />
                  {activeType === "business" ? "Business Categories" : "Listing Categories"}
                </h3>

                <Space>
                  <Input
                    placeholder="Search categories"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-72 h-10"
                    allowClear
                  />
                </Space>
              </div>

              {categoriesLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} active paragraph={{ rows: 1 }} />
                  ))}
                </div>
              ) : filteredCategories.length === 0 ? (
                <Empty
                  description={
                    searchTerm
                      ? "No categories match your search"
                      : `No ${activeType} categories yet — create your first one`
                  }
                  className="py-16"
                />
              ) : (
                <Table
                  columns={columns}
                  dataSource={filteredCategories}
                  rowKey="_id"
                  pagination={{ pageSize: 8 }}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="sub"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div
                  onClick={() => setShowSubCategories(false)}
                  className="flex items-center gap-2 cursor-pointer text-[#060853] hover:opacity-80"
                >
                  <ArrowLeftOutlined className="text-xs" />
                  <span className="font-bold">{selectedCategory?.name}</span>
                  <span className="text-xs text-gray-400 font-normal">— Sub-categories</span>
                </div>

                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openAddModal(selectedCategory)}
                    className="bg-[#060853]! border-none!"
                  >
                    Add Sub-Category
                  </Button>
                </Space>
              </div>

              {(selectedCategory?.subCategories || []).length === 0 ? (
                <Empty description="No sub-categories yet" className="py-16" />
              ) : (
                <Table
                  rowKey="_id"
                  columns={subColumns}
                  dataSource={selectedCategory?.subCategories || []}
                  pagination={false}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* ========================= */}
      {/* ADD / EDIT CATEGORY MODAL */}
      {/* ========================= */}
      <Modal
        open={modalOpen}
        footer={null}
        centered
        width={520}
        onCancel={closeModal}
        title={
          <div>
            <h2 className="text-xl font-bold">
              {modalMode === "add"
                ? addingSubTo
                  ? `Add Sub-Category under "${addingSubTo.name}"`
                  : "Add Category"
                : "Edit Category"}
            </h2>
            <p className="text-xs text-gray-400 font-normal mt-1 capitalize">
              {activeType} category
            </p>
          </div>
        }
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit} className="mt-6">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input placeholder="e.g Electronics & Gadgets" className="h-11" />
          </Form.Item>

          {!addingSubTo && (
            <Form.Item label="Parent Category (optional)" name="parentCategory">
              <Select
                allowClear
                placeholder="None — this is a top-level category"
                className="h-11"
                options={topLevelOptions.filter(
                  (opt) => !editingCategory || opt.value !== editingCategory._id,
                )}
              />
            </Form.Item>
          )}

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Brief description of this category" />
          </Form.Item>

          <Form.Item label="Sort Order" name="sortOrder">
            <Input type="number" placeholder="0" className="h-11" />
          </Form.Item>

          <Form.Item label="Icon (optional)">
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={(file) => {
                setIconFile(file);
                return false;
              }}
              onRemove={() => setIconFile(null)}
            >
              <Button icon={<UploadOutlined />}>Upload Icon</Button>
            </Upload>
          </Form.Item>

          {modalMode === "edit" && (
            <Form.Item label="Active" name="isActive" valuePropName="checked">
              <Switch />
            </Form.Item>
          )}

          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={closeModal} className="px-8">
              Cancel
            </Button>

            <Button
              htmlType="submit"
              loading={mutating}
              type="primary"
              icon={<SaveOutlined />}
              className="bg-[#060853]! border-none! px-8!"
            >
              {modalMode === "add" ? "Save Category" : "Save Changes"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ========================= */}
      {/* DELETE CONFIRM MODAL */}
      {/* ========================= */}
      <Modal
        open={deleteModalOpen}
        footer={null}
        centered
        width={420}
        onCancel={() => setDeleteModalOpen(false)}
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <DeleteOutlined className="text-red-500 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Delete "{deleteTarget?.name}"?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. Categories currently in use by businesses or listings
            cannot be deleted.
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => setDeleteModalOpen(false)} className="px-6">
              Cancel
            </Button>
            <Button
              danger
              type="primary"
              loading={mutating}
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="px-6"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryManagement;