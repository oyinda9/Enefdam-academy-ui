"use client";
import { z } from "zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeacher, updateTeacher } from "@/services/teacherServices";
import { getAllclass } from "@/services/classServices";
import { getAllsubject } from "@/services/subjectService";

// Dynamic Validation Schema
const createSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters!"),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Surname is required!"),
  email: z.string().email("Invalid email address!"),
  phone: z.string().regex(/^\+234[789][01]\d{8}$|^0[789][01]\d{8}$/, "Invalid Nigerian phone number!"),
  address: z.string().min(1, "Address is required!"),
  bloodType: z.string().min(1, "Blood type is required!"),
  sex: z.enum(["MALE", "FEMALE"], { message: "Select a valid gender!" }),
  birthday: z.string().min(1, "Birthday is required!"),
  classIds: z.array(z.number()).min(1, "Select at least one class!"),
  subjectIds: z.array(z.number()).min(1, "Select at least one subject!"),
  img: z.instanceof(File).optional(),
});

const updateSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  bloodType: z.string().optional(),
  sex: z.string().optional(),
  birthday: z.string().optional(),
  classIds: z.array(z.number()).optional(),
  subjectIds: z.array(z.number()).optional(),
  img: z.instanceof(File).optional(),
});

const TeacherForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(type === "create" ? createSchema : updateSchema),
    defaultValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
      bloodType: "",
      sex: undefined,
      birthday: "",
      classIds: [],
      subjectIds: [],
      img: undefined,
    },
  });

  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize form with data when in update mode
  useEffect(() => {
    if (data && type === "update") {
      reset({
        username: data.username || "",
        name: data.name || "",
        surname: data.surname || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        bloodType: data.bloodType || "",
        sex: data.sex || undefined,
        birthday: data.birthday || "",
        classIds: data.classIds || [],
        subjectIds: data.subjectIds || [],
     
      });
    }
  }, [data, type, reset]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classesData, subjectsData] = await Promise.all([
          getAllclass(),
          getAllsubject(),
        ]);
        setClasses(classesData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMultiSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setValue("classIds", values);
    trigger("classIds");
  };

  const handleMultiSelectForSubject = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setValue("subjectIds", values);
    trigger("subjectIds");
  };

  const onSubmit = async (formData: any) => {
    try {
      if (type === "create") {
        await createTeacher(formData);
        alert("Teacher created successfully!");
      } else if (type === "update" && data?.id) {
        const updateData: any = new FormData();
        let hasChanges = false;
  
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== undefined && formData[key] !== data[key]) {
            hasChanges = true;
            if (key === "img" && formData[key] instanceof File) {
              updateData.append(key, formData[key]);
            } else if (Array.isArray(formData[key])) {
              updateData.append(key, JSON.stringify(formData[key])); // Ensure array fields are properly formatted
            } else {
              updateData.append(key, formData[key]);
            }
          }
        });
  
        if (hasChanges) {
          await updateTeacher(data.id, updateData);
          alert("Teacher updated successfully!");
        } else {
          alert("No changes detected!");
        }
      }
    } catch (error) {
      alert(`Failed to ${type === "create" ? "create" : "update"} teacher.`);
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] h-[600px] mx-auto p-4 bg-white rounded-lg overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        {/* Username */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Username</label>
          <input
            type="text"
            {...register("username")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.username?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.email?.message}</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600">First Name</label>
          <input
            type="text"
            {...register("name")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.name?.message}</p>
        </div>

        {/* Surname */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Surname</label>
          <input
            type="text"
            {...register("surname")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.surname?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.phone?.message}</p>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Address</label>
          <input
            type="text"
            {...register("address")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.address?.message}</p>
        </div>

        {/* Blood Type */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Blood Type</label>
          <input
            type="text"
            {...register("bloodType")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.bloodType?.message}</p>
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Birthday</label>
          <input
            type="date"
            {...register("birthday")}
            className="border p-2 w-full rounded text-gray-700"
          />
          <p className="text-red-600 text-xs">{errors.birthday?.message}</p>
        </div>

        {/* Sex */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Sex</label>
          <select
            {...register("sex")}
            className="border p-2 w-full rounded text-gray-700"
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <p className="text-red-600 text-xs">{errors.sex?.message}</p>
        </div>

        {/* Classes */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Classes</label>
          <select
            multiple
            className="border p-2 w-full rounded text-gray-700"
            onChange={handleMultiSelect}
            value={watch("classIds") || []}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))
            )}
          </select>
          <p className="text-red-600 text-xs">{errors.classIds?.message}</p>
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-xs font-medium text-gray-600">Subjects</label>
          <select
            multiple
            className="border p-2 w-full rounded text-gray-700"
            onChange={handleMultiSelectForSubject}
            value={watch("subjectIds") || []}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))
            )}
          </select>
          <p className="text-red-600 text-xs">{errors.subjectIds?.message}</p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 p-2 bg-blue-600 text-white rounded w-full"
      >
        {type === "create" ? "Register Teacher" : "Update Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;