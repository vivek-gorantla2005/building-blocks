"use client"
import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import BaseTriggerNode from "../base-trigger-node";
import { MousePointer } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";
export const ManualTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen ,setDialogOpen ] = useState(false);
    const handleOpenSettings=()=>{
        setDialogOpen(true)
    }
    const nodeStatus = "loading"
    return (
        <>
            <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
            <BaseTriggerNode
                {...props}
                icon={MousePointer} 
                name="Manual Trigger"
                status={nodeStatus}
                onSettings={() => handleOpenSettings()}
                onDoubleClick={()=>{}}
            />
        </>
    )
})