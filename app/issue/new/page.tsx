"use client";
import { Input } from "@/components/ui/input";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <Input placeholder="Enter Issue Title" className="w-full max-w-[700px]" />
      <SimpleMDE
        placeholder="Enter Issue Description"
        className="w-full max-w-[700px]"
      />
    </div>
  );
}
