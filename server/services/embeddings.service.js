const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_TOKEN);

const createEmbeddings = async (productTextData) => {
  try {
    //create Embeddings for product Data
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: productTextData,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

async function postWithRetry(url, data, config, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.post(url, data, config);
    } catch (error) {
      if (error.response && error.response.status === 503 && i < retries - 1) {
        const estimatedWait = error.response.data.estimated_time || 3000;
        await new Promise((res) => setTimeout(res, estimatedWait));
      } else {
        throw error;
      }
    }
  }
}

module.exports = {
  createEmbeddings,
};
