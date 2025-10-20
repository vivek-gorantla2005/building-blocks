"use client";

import { memo } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import BaseExecutionNode from "../base-execution-node";

type HttpRequestNode = {
  endPoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNode>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data || {};

  const description = nodeData.endPoint
    ? `${nodeData.method || "GET"}: ${nodeData.endPoint}`
    : "Not Configured";

  return (
    <BaseExecutionNode
      {...props}
      icon={GlobeIcon}
      name="HTTP Request"
      description={description}
      onSettings={() => {
        console.log("Open HTTP request settings for node:", props.id);
      }}
      onDoubleClick={() => {
        console.log("Double-clicked HTTP request node:", props.id);
      }}
    />
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
