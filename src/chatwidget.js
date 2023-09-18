import React from "react";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "langflow-chat": any;
//     }
//   }
// }

export default function ChatWidget({ className }) {
  return (
    <div className={className}>
      <langflow-chat
        window_title="Basic Chat with Prompt and History (8)"
        flow_id="bd35b5f7-9bec-4acd-86a2-4866eb8f2038"
        chat_inputs='{"text":""}'
        chat_input_field="text"
        host_url="http://localhost:7860"
      ></langflow-chat>
    </div>
  );
}
