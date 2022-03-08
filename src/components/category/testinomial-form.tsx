import { Fragment, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import { ClassOptions } from "@constant/student";

interface FormValues {
  name: string;
  class: string;
  status_option: string;
  content: string;
}

const statusOptions = ["Active", "Inactive"];

export default function RegisterPage() {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedClass, setSelectedClass] = useState(ClassOptions[0]);
  const [selectedStatusOption, setSelectedStatusOption] = useState(
    statusOptions[0]
  );
  const [profilePhoto, setProfilePhoto] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onDrop = (acceptedFiles: any) => {
    setProfilePhoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (status === "failed") {
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
  }, [status]);

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("class", data.class ? data.class : ClassOptions[0]);
    formData.append(
      "status",
      data.status_option ? data.status_option : selectedStatusOption[0]
    );
    formData.append("photo", profilePhoto!);
    try {
      const res = await fetch(`${process.env.API_URL}/testinomial/`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("success");
        setProcessing(false);
        reset();
      }
    } catch (error: any) {
      console.log(error.message);
      setStatus("failed");
      setProcessing(false);
    }
  }

  return (
    <div className="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="text-center mb-3">
          <img
            className="inline object-cover w-28 h-28  rounded-full overflow-hidden border"
            src={
              profilePhoto
                ? URL.createObjectURL(profilePhoto)
                : "/images/default-profile.svg"
            }
            alt="Profile Photo"
          />
        </div>

        <div {...getRootProps()}>
          <input
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...getInputProps()}
          />
          <div className="flex justify-center">
            <div className="w-[184px] px-6 py-2 border cursor-pointer border-dashed border-gray-900 bg-gray-100 ">
              <p className=" text-[12px] uppercase ">Select Student Photo </p>
            </div>
          </div>
        </div>

        <div className="w-full mb-3">
          <Input
            variant="outline"
            type="text"
            label="Full Name"
            placeholder="Full Name"
            {...register("name", {
              required: "You must provide full name !",
            })}
            error={errors.name?.message}
          />
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full md:w-1/2  mb-3 ">
            <Controller
              name="class"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  value={selectedClass}
                  onChange={(e) => {
                    onChange(e);
                    setSelectedClass(e);
                  }}
                >
                  {({ open }) => (
                    <div className="relative lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                        Class
                      </Listbox.Label>

                      <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                        <span className="block truncate">{selectedClass}</span>
                        <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                          <HiOutlineSelector
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          static
                          className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                        >
                          {ClassOptions?.map((option, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-gray-100"
                                    : "text-gray-900"
                                }
                          cursor-default select-none relative py-2 ps-10 pe-4`
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {option}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active ? "text-amber-600" : ""
                                      }
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                                    >
                                      <HiCheck
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}
            />
          </div>
          <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
            <Controller
              name="status_option"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  value={selectedStatusOption}
                  onChange={(e) => {
                    onChange(e);
                    setSelectedStatusOption(e);
                  }}
                >
                  {({ open }) => (
                    <div className="relative lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                        Status
                      </Listbox.Label>

                      <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                        <span className="block truncate">
                          {selectedStatusOption}
                        </span>
                        <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                          <HiOutlineSelector
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          static
                          className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                        >
                          {statusOptions?.map((option, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-gray-100"
                                    : "text-gray-900"
                                }
                          cursor-default select-none relative py-2 ps-10 pe-4`
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {option}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active ? "text-amber-600" : ""
                                      }
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                                    >
                                      <HiCheck
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full px-3">
            <TextArea
              variant="solid"
              label=" Testinomial Message"
              {...register("content")}
              placeholder=" Write message here ..."
            />
          </div>
        </div>

        <div className="text-center mt-8 mb-8">
          <button className="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-5 rounded-full">
            {processing ? "Saving... " : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
