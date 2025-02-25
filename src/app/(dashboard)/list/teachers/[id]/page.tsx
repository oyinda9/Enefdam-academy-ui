"use client";
import React from "react";
import Image from "next/image";
import {
  Droplet,
  CalendarFold,
  Mail,
  Phone,
  CheckCircle,
  BookOpen,
  Split,
  School,
} from "lucide-react";
import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import TeacherPerfomance from "@/components/TeacherPerfomance";
import FormModal from "@/components/FormModal";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT SECTION */}
      <div className="w-full xl:w-2/3 ">
        {/* TOP ROW: User Info and Performance */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-blue-100 py-4 px-4 rounded-md flex gap-4 flex-1 ">
            {/* PROFILE IMAGE */}
            <div className="w-1/3">
              <Image
                src="/enfedam-logo.png"
                alt="Teacher profile"
                width={144}
                height={144}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* USER DETAILS */}
            <div className="w-[100%] flex flex-col justify-between gap-4  ">
              <div className="flex">
                {" "}
                <h1 className="text-xl font-semibold">Sholanke Precious</h1>
                <div className="flex items-center font-semibold gap-4 ml-6">
                  <FormModal
                    table="teacher"
                    type="update"
                    data={{
                      id: 1,
                      username: "john_doe123", // Minimum 3, maximum 20 characters
                      email: "john.doe@example.com", // Valid email format
                      password: "password123", // Minimum 8 characters
                      firstName: "John", // Required
                      lastName: "Doe", // Required
                      phone: "1234567890", // Required
                      address: "123 Main Street, Springfield", // Required
                      bloodtype: "O+", // Required
                      birthday: "1990-01-01", // Required
                      sex: "male", // Enum: "male" or "female"
                      img: new File(["dummy content"], "profile.jpg", {
                        type: "image/jpeg",
                      }), // Required file instance
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus ipsam.
              </p>

              {/* SMALL INFO GRID */}

              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  text-xs font-medium">
                {/* First Row */}
                <div className="flex justify-between flex-col">
                  <div className="flex items-center gap-2">
                    <Droplet width={16} height={16} />
                    <span>A+</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarFold width={16} height={16} />
                    <span>January 2025</span>
                  </div>

                  {/* Second Row */}
                  <div className="flex items-center gap-2">
                    <Phone width={16} height={16} />
                    <span>99007677899</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail width={16} height={16} />
                    <span>user@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE CARD */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 text-xs font-medium ">
            {/* Attendance */}

            <div className="flex items-center justify-between  bg-white p-2 rounded-md ">
              <div className="flex items-center gap-3">
                <div className="bg-blue-200 p-2 rounded-full">
                  <CheckCircle className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Attendance
                </span>
                <span className="text-sm font-semibold text-gray-900">95%</span>
              </div>
            </div>

            {/* Lessons */}

            <div className="flex items-center justify-between  bg-white p-2 rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-green-200 p-2 rounded-full">
                  <BookOpen className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Lessons
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 ">12</span>
            </div>

            {/* Classes */}
            <div className="flex items-center justify-between  bg-white p-2 rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-200 p-2 rounded-full">
                  <School className="text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Classes
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 ">5</span>
            </div>

            {/* Branches */}
            <div className="flex items-center justify-between bg-white p-2 rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-red-200 p-2 rounded-full">
                  <Split className="text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Branches
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">18</span>
            </div>
          </div>
        </div>

        {/* SCHEDULE SECTION */}
        <div className=" p-4 rounded-md h-[800px]">
          <h2 className="text-lg font-semibold mb-2">
            {" "}
            Teacher&apos;s Schedule
          </h2>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full xl:w-1/3   rounded-md mb-6">
        <div className="bg-white p-4 rounded-md">
          <h1>Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-800">
            <Link
              className="p-3 rounded-md bg-blue-200"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              {" "}
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-200"
              href={`/list/students?teacher=${"teacher2"}`}
            >
              {" "}
              Teacher&apos;s Students
            </Link>
            <Link className="p-3 rounded-md bg-yellow-200"  href={`/list/classes?teacherId=${"teacher2"}`}
            >
              {" "}
              Teacher&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-purple-200" href={`/list/exams?teacherId=${"teacher2"}`}>
              {" "}
              Teacher&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-green-200" href={`/list/assignments?teacherId=${"teacher2"}`}>
              {" "}
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <TeacherPerfomance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
