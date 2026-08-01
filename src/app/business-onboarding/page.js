
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Upload,
  Radio,
  TimePicker,
  message,
  Spin,
} from "antd";
import { FiCheck } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { FiX } from "react-icons/fi";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useBusinessStore } from "@/store/businessStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Country, City } from "country-state-city";

const { Dragger } = Upload;

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

// These can stay outside the function too
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 13);
  }, [center, map]);
  return null;
}

const { TextArea } = Input;

export default function MultiStepForm() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [businessCert, setBusinessCert] = useState(null);
  const [businessLicense, setBusinessLicense] = useState(null);
  const [taxCertificate, setTaxCertificate] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // NEW: category dropdown data + loading state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Pull both actions from your business store
  const {
    onboardBusiness,
    registerInitialUser,
    onboardingLoading,
    fetchBusinessCategories,
  } = useBusinessStore();

  // NEW: fetch categories once on mount
  useEffect(() => {
    let isMounted = true;

    (async () => {
      setCategoriesLoading(true);
      const result = await fetchBusinessCategories();
      if (isMounted) {
        setCategories(result);
        setCategoriesLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchBusinessCategories]);

  // NEW: flatten parent + subCategories into a single option list for the
  // multi-select, with sub-categories visually indented under their parent.
  const categoryOptions = useMemo(() => {
    const options = [];

    categories.forEach((parent) => {
      options.push({
        value: parent._id,
        label: parent.name,
      });

      (parent.subCategories || []).forEach((sub) => {
        options.push({
          value: sub._id,
          label: `— ${sub.name}`,
        });
      });
    });

    return options;
  }, [categories]);

  const steps = useMemo(() => {
    const businessSteps = [
      "Business Information",
      "Business Location",
      "Business Branding",
      "Business Hours",
    ];

    return isAuthenticated
      ? businessSteps
      : ["Account Information", ...businessSteps];
  }, [isAuthenticated]);

  const prev = () => {
    setCurrent((step) => {
      const next = step - 1;
      return next < 0 ? 0 : next;
    });
  };

  const verificationStep = steps.length;
  const businessInfoStep = isAuthenticated ? 0 : 1;
  const locationStep = isAuthenticated ? 1 : 2;
  const brandingStep = isAuthenticated ? 2 : 3;
  const hoursStep = isAuthenticated ? 3 : 4;
  const imageStep = Math.min(current + 1, 5);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referredByCode: "",
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    category: [],
    address: "",
    postalCode: "",
    businessCountry: "",
    businessCity: "",
    description: "",
    website: "",
    instagram: "",
    twitter: "",
    facebook: "",
    logo: null,
    banner: null,
    documents: [],

    businessCert: null,
    businessCertType: "CAC",

    businessLicense: null,
    businessLicenseType: "ID_CARD",

    taxCertificate: null,
    taxCertificateType: "TAX_CERTIFICATE",
    taxMethod: "",
    taxNumber: "",

    proofOfAddress: null,
    proofOfAddressType: "UTILITY_BILL",
  });

  const countries = useMemo(() => Country.getAllCountries(), []);
  const cities = useMemo(
    () =>
      formData.businessCountry
        ? City.getCitiesOfCountry(formData.businessCountry)
        : [],
    [formData.businessCountry]
  );

  const selectedCityCoords = useMemo(() => {
    const city = cities.find((c) => c.name === formData.businessCity);
    return city
      ? [parseFloat(city.latitude), parseFloat(city.longitude)]
      : [9.0578, 7.4951];
  }, [formData.businessCity, cities]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [coords, setCoords] = useState([9.0578, 7.4951]);

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const validations = {
    length: formData.password.length >= 8,
    numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    case:
      /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
  };

  const passwordValid =
    validations.length && validations.numberOrSymbol && validations.case;

  const hasValue = (value) => {
    return value !== undefined && value !== null && String(value).trim() !== "";
  };

  const validateAccountStep = () => {
    if (isAuthenticated) return true;

    if (!hasValue(formData.name)) {
      message.error("Please enter your full name");
      return false;
    }

    if (!hasValue(formData.email)) {
      message.error("Please enter your email address");
      return false;
    }

    if (!hasValue(formData.phoneNumber)) {
      message.error("Please enter your phone number");
      return false;
    }

    if (!hasValue(formData.password)) {
      message.error("Please create a password");
      return false;
    }

    if (!passwordValid) {
      message.error(
        "Password must be at least 8 characters and contain uppercase, lowercase and a number or symbol."
      );
      return false;
    }

    if (!hasValue(formData.confirmPassword)) {
      message.error("Please confirm your password");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const validateBusinessInfoStep = () => {
    if (!hasValue(formData.businessName)) {
      message.error("Please enter your business name");
      return false;
    }

    if (!hasValue(formData.businessEmail)) {
      message.error("Please enter your business email");
      return false;
    }

    if (!hasValue(formData.businessPhone)) {
      message.error("Please enter your business phone number");
      return false;
    }

    if (!Array.isArray(formData.category) || formData.category.length === 0) {
      message.error("Please select at least one business category");
      return false;
    }
    if (!hasValue(formData.description)) {
      message.error("Please enter at least 20 characters");
      return false;
    }

    return true;
  };

  const validateLocationStep = () => {
    if (!hasValue(formData.businessCountry)) {
      message.error("Please select your business country");
      return false;
    }

    if (!hasValue(formData.businessCity)) {
      message.error("Please select your business city");
      return false;
    }

    if (!hasValue(formData.address)) {
      message.error("Please enter your business address");
      return false;
    }

    if (!hasValue(formData.postalCode)) {
      message.error("Please enter your postal code");
      return false;
    }

    return true;
  };

  const validateBrandingStep = () => {
    if (!formData.logo) {
      message.error("Please upload your business logo");
      return false;
    }
    return true;
  };

  const validateVerificationStep = () => {
    if (!formData.businessCert) {
      message.error("Please upload your Business Registration Certificate");
      return false;
    }
    if (!formData.taxMethod) {
      message.error("Please select Tax Number or Tax Certificate");
      return false;
    }
    if (
      formData.taxMethod === "certificate" &&
      !formData.taxCertificate
    ) {
      message.error("Please upload your Tax Certificate");
      return false;
    }
    if (
      formData.taxMethod === "number" &&
      !formData.taxNumber.trim()
    ) {
      message.error("Please enter your Tax Number");
      return false;
    }
    if (!formData.proofOfAddress) {
      message.error("Please upload Proof of Address");
      return false;
    }
    return true;
  };

  const validateCurrentStep = () => {
    if (!isAuthenticated && current === 0) return validateAccountStep();
    if (current === businessInfoStep) return validateBusinessInfoStep();
    if (current === locationStep) return validateLocationStep();
    if (current === brandingStep) return validateBrandingStep();
    if (current === hoursStep) return validateSelectedHours();
    if (current === verificationStep) return validateVerificationStep();
    return true;
  };

  const next = async () => {
    try {
      await form.validateFields();

      if (!validateCurrentStep()) return;

      if (!isAuthenticated && current === 0) {
        await registerInitialUser(
          {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            referredByCode: formData.referredByCode,
          },
          router
        );
        return;
      }

      if (current < verificationStep) setCurrent((c) => c + 1);
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  const handleSubmit = async () => {
    if (current !== verificationStep) return;

    try {
      if (!isAuthenticated && !validateAccountStep()) {
        setCurrent(0);
        return;
      }

      if (!validateBusinessInfoStep()) {
        setCurrent(businessInfoStep);
        return;
      }

      if (!validateLocationStep()) {
        setCurrent(locationStep);
        return;
      }

      if (!validateSelectedHours()) {
        setCurrent(hoursStep);
        return;
      }

      if (
        !formData.businessCert ||
        !formData.taxMethod ||
        (formData.taxMethod === "certificate" &&
          !formData.taxCertificate) ||
        (formData.taxMethod === "number" &&
          !formData.taxNumber.trim()) ||
        !formData.proofOfAddress
      ) {
        message.error(
          "Please provide all mandatory documents and your tax certificate or tax number."
        );
        return;
      }

      const documents = [
        formData.businessCert,
        formData.businessLicense,
        formData.taxCertificate,
        formData.proofOfAddress,
      ].filter(Boolean);

      const selectedDocTypes = [];

      if (formData.businessCert)
        selectedDocTypes.push(formData.businessCertType);

      if (formData.businessLicense)
        selectedDocTypes.push(formData.businessLicenseType);

      if (formData.taxCertificate)
        selectedDocTypes.push(formData.taxCertificateType);

      if (formData.proofOfAddress)
        selectedDocTypes.push(formData.proofOfAddressType);

      if (!selectedDocTypes.includes("CAC")) {
        message.error("A Business Registration Certificate is required.");
        return;
      }

      if (!selectedDocTypes.includes("ID_CARD")) {
        message.error("A valid Proof of Identification is required.");
        return;
      }

      const operatingHours =
        hoursType === "always"
          ? []
          : selectedDays.map((item) => {
              const open = item.open?.format("h:mm A") || "";
              const close = item.close?.format("h:mm A") || "";

              return {
                day: item.day,
                open,
                close,
                shifts: [{ open, close }],
                closed: false,
              };
            });

      const response = await onboardBusiness(
        {
          ...formData,
          documents,
          operatingHours,
        },
        router
      );

      if (response?.success && !response?.requiresVerification) {
        message.success("Business onboarding successful");
      }

      return response;
    } catch (error) {
      console.log("Submission Error:", error);
      message.error("An error occurred during submission. Please try again.");
    }
  };

  const [hoursType, setHoursType] = useState("always");
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedDays, setSelectedDays] = useState([
    {
      day: "Monday",
      id: "monday-initial",
      open: null,
      close: null,
    },
  ]);

  const [dragIndex, setDragIndex] = useState(null);

  const addDay = () => {
    const usedDays = selectedDays.map((d) => d.day);
    const nextDay = allDays.find((d) => !usedDays.includes(d));

    if (!nextDay) return;

    setSelectedDays((prev) => [
      ...prev,
      {
        id: Date.now(),
        day: nextDay,
        open: null,
        close: null,
      },
    ]);
  };

  const removeDay = (id) => {
    setSelectedDays((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDay = (id, newDay) => {
    setSelectedDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, day: newDay } : d))
    );
  };

  const updateDayTime = (id, field, value) => {
    setSelectedDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const validateSelectedHours = () => {
    if (hoursType !== "selected") return true;

    for (const item of selectedDays) {
      if (!item.open || !item.close) {
        message.error(`Select opening and closing times for ${item.day}.`);
        return false;
      }

      if (!item.open.isBefore(item.close)) {
        message.error(`${item.day}'s closing time must be after opening time.`);
        return false;
      }

    }

    return true;
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null) return;

    const updated = [...selectedDays];
    const draggedItem = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(index, 0, draggedItem);

    setSelectedDays(updated);
    setDragIndex(null);
  };

  const handlePreview = (file, setPreview) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    return false;
  };

  // UPDATED: DraggerContent with restricted heights and object-contain for fitted images
  const DraggerContent = ({ preview, setPreview, label, onClear }) => (
    <div className="relative w-full h-28 max-h-28 flex flex-col items-center justify-center py-2 px-1 text-center">
      {preview ? (
        <div className="relative w-full h-full flex items-center justify-center p-1 overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="max-h-20 w-auto max-w-full object-contain rounded-md"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              handleFileChange("logo", null);
              if (onClear) onClear();
            }}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors cursor-pointer"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-[11px] mb-1 leading-tight">
            Drag & drop your {label} here <br />
            <span className="text-[9px] text-gray-400">Max 2mb</span>
          </p>
          <p className="text-gray-400 text-[10px] my-0.5">OR</p>
          <Button
            size="small"
            className="text-[11px] h-6 px-2.5 text-[#10b981]! border-[#10b981]! hover:text-[#0f766e]! hover:border-[#0f766e]! pointer-events-none"
          >
            Browse files
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="h-screen w-full flex md:flex-row bg-white text-black overflow-hidden font-sans">
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 px-6 lg:px-20 py-4 flex flex-col justify-center h-full overflow-y-auto">
        <img src="/images/logo.png" alt="logo" className="w-12 mb-2" />

        {/* HEADER + INDICATOR (HIDDEN ON VERIFICATION STEP) */}
        {current !== verificationStep && (
          <>
            <h2 className="text-lg font-bold text-[#1e293b]">
              Step {current + 1} of {steps.length}: {steps[current]}
            </h2>

            {/* STEP INDICATOR */}
            <div className="flex items-center justify-between mb-8 max-w-md">
              {steps.map((_, stepIndex) => {
                const isCompleted = stepIndex < current;
                const isActive =
                  stepIndex === current ||
                  (current === verificationStep &&
                    stepIndex === steps.length - 1);

                return (
                  <div
                    key={stepIndex}
                    className={`flex items-center ${
                      stepIndex < steps.length - 1 ? "w-full" : "w-auto"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-500
              ${
                isCompleted
                  ? "bg-green-500 border-green-500"
                  : isActive
                  ? "bg-gray-200 border-[#060853]"
                  : "bg-gray-50 border-gray-200"
              }`}
                    >
                      {isCompleted ? (
                        <FiCheck className="text-white" size={16} />
                      ) : (
                        <span
                          className={`text-xs font-bold ${
                            isActive ? "text-[#060853]" : "text-gray-400"
                          }`}
                        >
                          {stepIndex + 1}
                        </span>
                      )}
                    </div>

                    {stepIndex < steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-100 mx-2">
                        <div
                          className="h-full bg-green-500 transition-all duration-700"
                          style={{ width: isCompleted ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* FORM HEADER */}
            <div className="mb-4 -mt-4">
              <h3 className="text-md font-semibold text-[#1e293b]">
                {steps[current]}
              </h3>

              <p className="text-gray-500 text-xs">
                {!isAuthenticated && current === 0
                  ? "Create your account so we can link it to your business."
                  : current === businessInfoStep
                  ? "Tell us about your business to get started"
                  : current === locationStep
                  ? "Provide the details of your physical or operational base."
                  : current === brandingStep
                  ? "Enhance your brand access with a logo and banner"
                  : "Provide the operating times and days for your physical base."}
              </p>
            </div>
          </>
        )}

        <Form form={form} layout="vertical" className="w-full">
          {/* ACCOUNT STEP - ONLY FOR GUEST USERS */}
          {!isAuthenticated && current === 0 && (
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <Form.Item label="Full Name" required>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter Full Name"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Email Address" required>
                  <Input
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter Email Address"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Phone Number" required>
                  <PhoneInput
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                    country={"gb"}
                    value={formData.phoneNumber}
                    onChange={(phoneNumber) =>
                      handleChange("phoneNumber", `+${phoneNumber}`)
                    }
                    enableSearch={false}
                    countryCodeEditable={false}
                    enableClickOutside
                    containerStyle={{
                      width: "100%",
                    }}
                    buttonStyle={{
                      background: "#f9fafb",
                      border: "1px solid #d9d9d9 !important",
                      borderRight: "none",
                      borderRadius: "6px 0 0 6px",
                      height: "36px",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "36px",
                      background: "#f9fafb",
                      color: "black",
                      fontSize: "12px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                    }}
                    dropdownStyle={{
                      maxHeight: "250px",
                      overflowY: "auto",
                      zIndex: 99999,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Password" required>
                  <Input.Password
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Create Password"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>

                <div className="mb-4 space-y-1 h-16">
                  <p
                    className={`text-[10px] flex items-center gap-1 ${
                      validations.length ? "text-[#15BE87]" : "text-gray-400"
                    }`}
                  >
                    {validations.length ? (
                      <CheckCircleFilled className="text-[9px]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />
                    )}
                    At least 8 characters
                  </p>

                  <p
                    className={`text-[10px] flex items-center gap-1 ${
                      validations.numberOrSymbol
                        ? "text-[#15BE87]"
                        : "text-gray-400"
                    }`}
                  >
                    {validations.numberOrSymbol ? (
                      <CheckCircleFilled className="text-[9px]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />
                    )}
                    One number or symbol
                  </p>

                  <p
                    className={`text-[10px] flex items-center gap-1 ${
                      validations.case ? "text-[#15BE87]" : "text-gray-400"
                    }`}
                  >
                    {validations.case ? (
                      <CheckCircleFilled className="text-[9px]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />
                    )}
                    Lowercase and uppercase
                  </p>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Confirm Password"
                  validateStatus={
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "error"
                      : ""
                  }
                  help={
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "Passwords do not match"
                      : ""
                  }
                >
                  <Input.Password
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm Password"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* BUSINESS INFORMATION STEP */}
          {current === businessInfoStep && (
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <Form.Item label="Business Name" required>
                  <Input
                    value={formData.businessName}
                    onChange={(e) =>
                      handleChange("businessName", e.target.value)
                    }
                    placeholder="Enter Business Name"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Business Email" required>
                  <Input
                    value={formData.businessEmail}
                    onChange={(e) =>
                      handleChange("businessEmail", e.target.value)
                    }
                    placeholder="Enter Business Email"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Phone Number" required>
                  <PhoneInput
                    className="bg-gray-50! text-xs! rounded-md!"
                    country={"gb"}
                    value={formData.businessPhone}
                    onChange={(phone) =>
                      handleChange("businessPhone", `+${phone}`)
                    }
                    enableSearch={false}
                    countryCodeEditable={false}
                    disableDropdown={false}
                    enableClickOutside={true}
                    dropdownStyle={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      zIndex: 9999,
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Website (Optional)">
                  <Input
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="www.example.com"
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Business Category" required>
                  <Select
                    mode="multiple"
                    size="small"
                    value={formData.category}
                    onChange={(value) => handleChange("category", value)}
                    placeholder="Select one or more categories"
                    className="bg-gray-50! text-xs! rounded-md!"
                    loading={categoriesLoading}
                    notFoundContent={
                      categoriesLoading ? (
                        <div className="flex items-center justify-center py-3">
                          <Spin
                            size="small"
                            indicator={
                              <LoadingOutlined
                                style={{ fontSize: 14 }}
                                spin
                              />
                            }
                          />
                          <span className="ml-2 text-xs text-gray-400">
                            Loading categories...
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          No categories available
                        </span>
                      )
                    }
                    options={categoryOptions}
                    optionFilterProp="label"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Business Description">
                  <TextArea
                    value={formData.description}
                    rules={[
                      {
                        min: 20,
                        message: "Please enter at least 20 characters",
                      },
                    ]}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={4}
                    placeholder="Detailed description"
                    className="bg-gray-50! text-xs! rounded-md! resize-none!"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* BUSINESS LOCATION STEP */}
          {current === locationStep && (
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <Form.Item label="Country" required>
                  <Select
                    showSearch
                    size="small"
                    placeholder="Select Country"
                    value={formData.businessCountry}
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                    optionFilterProp="children"
                    onChange={(value) => {
                      handleChange("businessCountry", value);
                      handleChange("businessCity", "");
                    }}
                    filterOption={(input, option) => {
                      const text =
                        typeof option?.children === "string"
                          ? option.children
                          : Array.isArray(option?.children)
                          ? option.children.join(" ")
                          : "";
                      return text.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {countries.map((country) => (
                      <Select.Option key={country.isoCode} value={country.isoCode}>
                        {country.flag} {country.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="City" required>
                  <Select
                    showSearch
                    size="small"
                    placeholder="Select City"
                    value={formData.businessCity}
                    className="bg-gray-50! h-9! text-xs! rounded-md!"
                    disabled={!formData.businessCountry}
                    optionFilterProp="children"
                    onChange={(value) => handleChange("businessCity", value)}
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {cities.map((city, index) => (
                      <Select.Option
                        key={`${city.name}-${index}`}
                        value={city.name}
                      >
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Address" required>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Enter address"
                    className="bg-gray-50! h-9! text-xs!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Postal Code" required>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleChange("postalCode", e.target.value)
                    }
                    placeholder="Postal code"
                    className="bg-gray-50! h-9! text-xs!"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className="text-xs font-medium mb-1">Map Location</div>
                <div className="text-[10px] text-gray-400 mb-2">
                  Add your exact location
                </div>

                <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-200 relative z-0">
                  <MapContainer
                    center={selectedCityCoords}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    whenReady={(map) => {
                      console.log("Map is ready");
                    }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapController center={selectedCityCoords} />
                  </MapContainer>
                </div>
              </Col>
            </Row>
          )}

          {/* BUSINESS BRANDING STEP */}
          {current === brandingStep && (
            <Row gutter={[0, 24]}>
              {/* LOGO UPLOAD */}
              <Col span={24} className="-mb-5">
                <Form.Item
                  label={
                    <span className="text-xs font-bold text-[#1e293b]">
                      Upload Logo
                    </span>
                  }
                >
                  <Dragger
                    accept="image/*"
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleFileChange("logo", file);
                      handlePreview(file, setLogoPreview);
                      return false;
                    }}
                    className="bg-[#f0fdfa]! border-[#5eead4]! rounded-xl overflow-hidden border-dashed h-28 flex items-center justify-center p-1"
                    style={{ height: "112px" }}
                    customRequest={({ onSuccess }) => onSuccess("ok")}
                  >
                    <DraggerContent
                      preview={logoPreview}
                      setPreview={setLogoPreview}
                      label="Logo"
                      onClear={() => handleFileChange("logo", null)}
                    />
                  </Dragger>
                </Form.Item>
              </Col>

              {/* BANNER UPLOAD */}
              <Col span={24} className="-mb-3">
                <Form.Item
                  label={
                    <span className="text-xs font-bold text-[#1e293b]">
                      Upload Banner (Optional)
                    </span>
                  }
                  extra={
                    <span className="text-[10px] text-gray-400">
                      Best ratio: 16:9. Max size: 2MB
                    </span>
                  }
                >
                  <Dragger
                    accept="image/*"
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleFileChange("banner", file);
                      handlePreview(file, setBannerPreview);
                      return false;
                    }}
                    className="bg-[#f0fdfa]! border-[#5eead4]! rounded-xl overflow-hidden border-dashed h-28 flex items-center justify-center p-1"
                    style={{ height: "112px" }}
                    customRequest={({ onSuccess }) => onSuccess("ok")}
                  >
                    <DraggerContent
                      preview={bannerPreview}
                      setPreview={setBannerPreview}
                      label="Banner"
                      onClear={() => handleFileChange("banner", null)}
                    />
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* BUSINESS HOURS STEP */}
          {current === hoursStep && (
            <div className="space-y-2">
              {/* TOP OPTIONS */}
              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <div
                    className={`p-2 border rounded-xl cursor-pointer ${
                      hoursType === "always"
                        ? "border-[#060853] bg-blue-50/50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setHoursType("always")}
                  >
                    <Radio checked={hoursType === "always"}>
                      <div>
                        <span className="font-bold text-sm">Always Open</span>
                        <p className="text-gray-400 text-xs">e.g parks</p>
                      </div>
                    </Radio>
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div
                    className={`p-2 border rounded-xl cursor-pointer ${
                      hoursType === "selected"
                        ? "border-[#060853] bg-blue-50/50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setHoursType("selected")}
                  >
                    <Radio checked={hoursType === "selected"}>
                      <div>
                        <span className="font-bold text-sm">
                          Selected Hours
                        </span>
                        <p className="text-gray-400 text-xs">
                          Set custom schedule
                        </p>
                      </div>
                    </Radio>
                  </div>
                </Col>
              </Row>

              {/* HOURS TABLE */}
              {hoursType === "selected" && (
                <div className="bg-white rounded-lg">
                  {selectedDays.map((item, index) => (
                    <Row
                      key={item.id}
                      align="middle"
                      gutter={12}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(index)}
                      className={`py-2 border-b border-gray-200 last:border-0 cursor-move ${
                        dragIndex === index ? "opacity-50" : ""
                      }`}
                    >
                      {/* DAY SELECT */}
                      <Col xs={24} md={6}>
                        <Select
                          value={item.day}
                          size="small"
                          className="bg-gray-50! h-9! mt-1! text-xs! rounded-md! w-full"
                          onChange={(value) => updateDay(item.id, value)}
                          options={allDays.map((d) => {
                            const isUsed = selectedDays.some(
                              (sd) => sd.day === d
                            );
                            const isCurrent = item.day === d;

                            return {
                              value: d,
                              label: d,
                              disabled: isUsed && !isCurrent,
                            };
                          })}
                        />
                      </Col>

                      {/* TIME */}
                      <Col xs={24} md={14} className="py-1">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <Form.Item className="mb-0">
                            <TimePicker
                              use12Hours
                              format="h:mm a"
                              value={item.open}
                              placeholder="Work starts"
                              className="!h-9 !w-full !text-xs"
                              onChange={(value) =>
                                updateDayTime(item.id, "open", value)
                              }
                            />
                          </Form.Item>

                          <Form.Item className="mb-0">
                            <TimePicker
                              use12Hours
                              format="h:mm a"
                              value={item.close}
                              placeholder="Work ends"
                              className="!h-9 !w-full !text-xs"
                              onChange={(value) =>
                                updateDayTime(item.id, "close", value)
                              }
                            />
                          </Form.Item>

                        </div>
                      </Col>

                      {/* ACTIONS */}
                      <Col
                        xs={24}
                        md={4}
                        className="flex items-center justify-end gap-2"
                      >
                        {/* ADD */}
                        {index === selectedDays.length - 1 && (
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addDay}
                            className="!bg-blue-50 !h-9 w-full"
                          />
                        )}

                        {/* DELETE */}
                        {selectedDays.length > 1 && (
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeDay(item.id)}
                            className="!h-9 w-full"
                          />
                        )}
                      </Col>
                    </Row>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VERIFICATION STEP */}
          {current === verificationStep && (
            <Row gutter={[0, 24]}>
              <Row gutter={[16, 12]} className="w-full">
                {/* 1. Business Registration Certificate */}
                <Col span={12}>
                  <Form.Item
                    label={
                      <span className="text-[10px] font-bold">
                        Business Registration Certificate
                      </span>
                    }
                    className="mb-1!"
                  >
                    <Form.Item
                      label={
                        <span className="text-[10px]">Document Type</span>
                      }
                      className="mb-1!"
                    >
                      <Select
                        size="small"
                        value={formData.businessCertType}
                        onChange={(value) =>
                          handleChange("businessCertType", value)
                        }
                        options={[
                          {
                            value: "CAC",
                            label: "Business Registration Certificate",
                          },
                          {
                            value: "ID_CARD",
                            label: "Proof of Identification",
                          },
                          { value: "UTILITY_BILL", label: "Utility Bill" },
                        ]}
                      />
                    </Form.Item>
                    <Dragger
                      showUploadList={false}
                      beforeUpload={(file) => {
                        handleFileChange("businessCert", file);
                        handlePreview(file, setBusinessCert);
                        return false;
                      }}
                      className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl h-28 flex items-center justify-center overflow-hidden p-1"
                      style={{ height: "112px" }}
                    >
                      <DraggerContent
                        preview={businessCert}
                        setPreview={setBusinessCert}
                        label="Certificate"
                        onClear={() => handleFileChange("businessCert", null)}
                      />
                    </Dragger>
                  </Form.Item>
                </Col>

                {/* 2. Operational Business License */}
                <Col span={12}>
                  <Form.Item
                    label={
                      <span className="text-[10px] font-bold">
                        Business Licence (optional)
                      </span>
                    }
                    className="mb-1!"
                  >
                    <Form.Item
                      label={
                        <span className="text-[10px]">Document Type</span>
                      }
                      className="mb-1!"
                    >
                      <Select
                        size="small"
                        value={formData.businessLicenseType}
                        onChange={(value) =>
                          handleChange("businessLicenseType", value)
                        }
                        options={[
                          {
                            value: "CAC",
                            label: "Business Registration Certificate",
                          },
                          {
                            value: "ID_CARD",
                            label: "Proof of Identification",
                          },
                          { value: "UTILITY_BILL", label: "Utility Bill" },
                        ]}
                      />
                    </Form.Item>
                    <Dragger
                      showUploadList={false}
                      beforeUpload={(file) => {
                        handleFileChange("businessLicense", file);
                        handlePreview(file, setBusinessLicense);
                        return false;
                      }}
                      className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl h-28 flex items-center justify-center overflow-hidden p-1"
                      style={{ height: "112px" }}
                    >
                      <DraggerContent
                        preview={businessLicense}
                        setPreview={setBusinessLicense}
                        label="License"
                        onClear={() =>
                          handleFileChange("businessLicense", null)
                        }
                      />
                    </Dragger>
                  </Form.Item>
                </Col>

                {/* 3. Tax Identification Certificate */}
                <Col span={12}>
                  <Form.Item
                    label={
                      <span className="text-[10px] font-bold">
                        Tax Certificate / Tax Number
                      </span>
                    }
                    className="mb-2"
                  >
                    <Radio.Group
                      value={formData.taxMethod}
                      onChange={(event) => {
                        const method = event.target.value;
                        handleChange("taxMethod", method);

                        if (method === "number") {
                          handleFileChange("taxCertificate", null);
                          setTaxCertificate(null);
                        } else {
                          handleChange("taxNumber", "");
                        }
                      }}
                      className="mb-3 grid w-full grid-cols-2"
                    >
                      <Radio.Button
                        value="number"
                        className="w-full text-center text-xs!"
                      >
                        Tax Number
                      </Radio.Button>
                      <Radio.Button
                        value="certificate"
                        className="w-full text-center text-xs!"
                      >
                        Tax Certificate
                      </Radio.Button>
                    </Radio.Group>

                    {formData.taxMethod === "certificate" && (
                      <Dragger
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleFileChange("taxCertificate", file);
                          handlePreview(file, setTaxCertificate);
                          return false;
                        }}
                        className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl h-28 flex items-center justify-center overflow-hidden p-1"
                        style={{ height: "112px" }}
                      >
                        <DraggerContent
                          preview={taxCertificate}
                          setPreview={setTaxCertificate}
                          label="Tax Certificate"
                          onClear={() =>
                            handleFileChange("taxCertificate", null)
                          }
                        />
                      </Dragger>
                    )}

                    {formData.taxMethod === "number" && (
                      <Input
                        value={formData.taxNumber}
                        onChange={(event) =>
                          handleChange("taxNumber", event.target.value)
                        }
                        placeholder="Enter Tax Identification Number"
                        className="h-9! bg-gray-50! text-xs!"
                        maxLength={50}
                      />
                    )}

                    {!formData.taxMethod && (
                      <p className="rounded-lg bg-gray-50 px-3 py-4 text-center text-[10px] text-gray-400">
                        Select how you want to provide your tax information.
                      </p>
                    )}
                  </Form.Item>
                </Col>

                {/* 4. Proof of Business Address */}
                <Col span={12}>
                  <Form.Item
                    label={
                      <span className="text-[10px] font-bold">
                        Proof of Address
                      </span>
                    }
                    className="mb-2"
                  >
                    <Form.Item
                      label={
                        <span className="text-[10px]">Document Type</span>
                      }
                      className="mb-1!"
                    >
                      <Select
                        size="small"
                        value={formData.proofOfAddressType}
                        onChange={(value) =>
                          handleChange("proofOfAddressType", value)
                        }
                        options={[
                          {
                            value: "CAC",
                            label: "Business Registration Certificate",
                          },
                          {
                            value: "ID_CARD",
                            label: "Proof of Identification",
                          },
                          { value: "UTILITY_BILL", label: "Utility Bill" },
                        ]}
                      />
                    </Form.Item>

                    <Dragger
                      showUploadList={false}
                      beforeUpload={(file) => {
                        handleFileChange("proofOfAddress", file);
                        handlePreview(file, setProofOfAddress);
                        return false;
                      }}
                      className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl h-28 flex items-center justify-center overflow-hidden p-1"
                      style={{ height: "112px" }}
                    >
                      <DraggerContent
                        preview={proofOfAddress}
                        setPreview={setProofOfAddress}
                        label="Address"
                        onClear={() => handleFileChange("proofOfAddress", null)}
                      />
                    </Dragger>
                  </Form.Item>
                </Col>

                {/* Submit Button */}
                <div className="mt-4 w-full flex items-center justify-center">
                  <Button
                    type="primary"
                    className="p-5! bg-[#060853]! border-none text-xs font-bold rounded-lg"
                    onClick={handleSubmit}
                    loading={onboardingLoading}
                  >
                    Submit Verification
                  </Button>
                </div>
              </Row>
            </Row>
          )}

          {current !== verificationStep && (
            <>
              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
                <Button
                  onClick={prev}
                  disabled={current === 0}
                  className="h-10 px-15! border"
                >
                  Back
                </Button>

                {current === hoursStep ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (validateCurrentStep()) setCurrent(verificationStep);
                    }}
                    className="h-10 px-15! !bg-[#060853] !border-none"
                  >
                    Save & Continue
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={next}
                    className="h-10 px-15! !bg-[#060853] !border-none"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </>
          )}
        </Form>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block md:w-1/2 relative h-full">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('/images/reg_img_${imageStep}.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
