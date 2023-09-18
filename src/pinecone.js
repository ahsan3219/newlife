import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { VectorDBQAChain } from "langchain/chains";

// Initialize Pinecone using PineconeClient
const client = new PineconeClient();

export const chat = async (query) => {
  await client.init({
    environment: "gcp-starter",
    apiKey: "68c84295-32e0-4282-957d-7bb25df1f177"
  });

  const openaiApiKey = "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"; // Replace with your OpenAI API key
  process.env.OPENAI_API_KEY = openaiApiKey;

  // Initialize OpenAI Embeddings
  const embeddings = new OpenAIEmbeddings();

  // Initialize the Pinecone index
  const indexName = "fertility"; // Replace with your Pinecone index name
  const pineconeIndex = client.Index("fertility");

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  /* Search the vector DB independently with meta filters */
  const results = await vectorStore.similaritySearch("pinecone", 3);
  console.log(results);
  /* Use as part of a chain (currently no metadata filters) */
  const model = new OpenAI();
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 3,
    returnSourceDocuments: true
  });
  const response = await chain.call({ query: query });
  console.log(response);
  return response;
};
// Initialize OpenAI

// app.post("/chatbot", (req, res) => {
//   try {
//     const data = req.body;
//     const query = data.query;

//     if (!query) {
//       return res.status(400).json({ error: "Missing 'query' parameter" });
//     }
//   } catch (e) {
//     return res.status(500).json({ error: e.toString() });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
