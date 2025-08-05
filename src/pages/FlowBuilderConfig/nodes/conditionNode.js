import {
  ArrowForwardIos,
  ContentCopy,
  Delete,
  CallSplit
} from "@mui/icons-material";
import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
import { useNodeStorage } from "../../../stores/useNodeStorage";

export default memo(({ data, isConnectable, id }) => {
  const storageItems = useNodeStorage();

  const getConditionSymbol = (condition) => {
    const symbols = {
      1: "==",
      2: ">=", 
      3: "<=",
      4: "<",
      5: ">"
    };
    return symbols[condition] || "==";
  };

  return (
    <div
      style={{ 
        backgroundColor: "#4A90E2", 
        padding: "8px", 
        borderRadius: "8px",
        minWidth: "180px"
      }}
    >
      <Handle
        type="target"
        position="left"
        style={{
          background: "#0000FF",
          width: "18px",
          height: "18px",
          top: "20px",
          left: "-12px",
          cursor: 'pointer'
        }}
        onConnect={params => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      >
        <ArrowForwardIos
          sx={{
            color: "#ffff",
            width: "10px",
            height: "10px",
            marginLeft: "3.5px",
            marginBottom: "1px",
            pointerEvents: "none"
          }}
        />
      </Handle>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 5,
          top: 5,
          cursor: "pointer",
          gap: 6
        }}
      >
        <ContentCopy
          onClick={() => {
            storageItems.setNodesStorage(id);
            storageItems.setAct("duplicate");
          }}
          sx={{ width: "12px", height: "12px", color: "#ffff" }}
        />

        <Delete
          onClick={() => {
            storageItems.setNodesStorage(id);
            storageItems.setAct("delete");
          }}
          sx={{ width: "12px", height: "12px", color: "#ffff" }}
        />
      </div>
      <div
        style={{
          color: "#ededed",
          fontSize: "16px",
          flexDirection: "row",
          display: "flex"
        }}
      >
        <CallSplit
          sx={{
            width: "16px",
            height: "16px",
            marginRight: "4px",
            marginTop: "4px"
          }}
        />
        <div style={{ color: "#ededed", fontSize: "16px" }}>Condição</div>
      </div>
      <div style={{ color: "#ededed", fontSize: "12px", width: 180 }}>
        {data.key} {getConditionSymbol(data.condition)} {data.value}
      </div>
      
      {/* Handle para TRUE */}
      <Handle
        type="source"
        position="right"
        id="true"
        style={{
          background: "#28a745",
          width: "18px",
          height: "18px",
          top: "60%",
          right: "-11px",
          cursor: 'pointer'
        }}
        isConnectable={isConnectable}
      >
        <ArrowForwardIos
          sx={{
            color: "#ffff",
            width: "10px",
            height: "10px",
            marginLeft: "2.9px",
            marginBottom: "1px",
            pointerEvents: "none"
          }}
        />
      </Handle>
      
      {/* Handle para FALSE */}
      <Handle
        type="source"
        position="right"
        id="false"
        style={{
          background: "#dc3545",
          width: "18px",
          height: "18px",
          top: "80%",
          right: "-11px",
          cursor: 'pointer'
        }}
        isConnectable={isConnectable}
      >
        <ArrowForwardIos
          sx={{
            color: "#ffff",
            width: "10px",
            height: "10px",
            marginLeft: "2.9px",
            marginBottom: "1px",
            pointerEvents: "none"
          }}
        />
      </Handle>
      
      <div style={{ 
        position: "absolute", 
        right: "-45px", 
        top: "58%", 
        fontSize: "10px", 
        color: "#28a745",
        fontWeight: "bold"
      }}>
        SIM
      </div>
      
      <div style={{ 
        position: "absolute", 
        right: "-45px", 
        top: "78%", 
        fontSize: "10px", 
        color: "#dc3545",
        fontWeight: "bold"
      }}>
        NÃO
      </div>
    </div>
  );
});