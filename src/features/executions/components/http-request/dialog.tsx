"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    endPoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
  };
  onSave: (data: { endPoint: string; method: string; body: string }) => void;
}

export const HttpRequestDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  initialData,
  onSave,
}) => {
  const [endPoint, setEndPoint] = useState(initialData?.endPoint || "");
  const [method, setMethod] = useState(initialData?.method || "GET");
  const [body, setBody] = useState(initialData?.body || "");

  const handleSave = () => {
    onSave({ endPoint, method, body });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg sm:mx-auto">
        <DialogHeader>
          <DialogTitle>HTTP Request Settings</DialogTitle>
          <DialogDescription>
            Configure the endpoint, HTTP method, and request body for this node.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Endpoint</label>
            <Input
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              placeholder="https://api.example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Method</label>
            <select
              value={method}
              className="border px-2 py-1 rounded-md bg-background"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Body</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key":"value"}'
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
