import React, { useState, useEffect } from "react";
import download from "js-file-download";
import { toast } from "react-toastify";

const FilesPage: React.FC = () => {
  const [planFile, setPlanFile] = useState<string | Blob | null>();
  const [pricingFile, setPricingFile] = useState<string | Blob | null>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (message === "failed") {
      toast.error(" Oops something went wrong !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (message === "success") {
      toast.success("File uploaded successfully !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [message]);

  const handleDownloadPlanFile = async () => {
    const res = await fetch(`${process.env.API_URL}/plans`);
    const data = await res.json();
    download(JSON.stringify(data), "plans.json");
  };

  const handleDownloadPricingFile = async () => {
    const res = await fetch(`${process.env.API_URL}/pricing`);
    const data = await res.json();
    download(JSON.stringify(data), "pricing.json");
  };

  const handleUploadPlanFile = async () => {
    setMessage("");
    if (!planFile) {
      alert("Please select json file with study plans details !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", planFile);
    try {
      const res = await fetch(`${process.env.API_URL}/plans`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setPlanFile(null);
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const handleUploadPricingFile = async () => {
    setMessage("");
    if (!pricingFile) {
      alert("Please select json file with plans pricing !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", pricingFile);
    try {
      const res = await fetch(`${process.env.API_URL}/pricing`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setPricingFile(null);
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-2">
        <div className="flex items-center justify-center">
          <label className="w-[320px] flex flex-col items-center py-2 text-blue-600 rounded-md border border-blue-700 cursor-pointer ">
            <span className="text-base leading-normal">
              Select Plans Details Json File
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                const file = target.files![0];
                setPlanFile(file);
              }}
            />
          </label>
        </div>

        <button
          onClick={handleUploadPlanFile}
          className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border  text-sm w-[240px]"
        >
          Upload Plans Details File
        </button>

        <button
          onClick={handleDownloadPlanFile}
          className="px-5 py-2.5 ml-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border  text-sm w-[240px]"
        >
          Download Plans Details File
        </button>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-2">
        <div className="flex items-center justify-center">
          <label className="w-[320px] flex flex-col items-center py-2 text-blue-600 rounded-md border border-blue-700 cursor-pointer ">
            <span className="text-base leading-normal">
              Select Plans Pricing Json File
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                const file = target.files![0];
                setPricingFile(file);
              }}
            />
          </label>
        </div>

        <button
          onClick={handleUploadPricingFile}
          className="px-4 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border  text-sm w-[232px]"
        >
          Upload Plans Pricing File
        </button>

        <button
          onClick={handleDownloadPricingFile}
          className="px-4 py-2.5 ml-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[232px]"
        >
          Download Plans Pricing File
        </button>
      </div>
    </>
  );
};

export default FilesPage;
