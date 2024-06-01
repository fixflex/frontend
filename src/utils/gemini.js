import axios from 'axios';

const generate = async (prompt) => {
  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText`,
      method: 'post',
      params: {
        key: process.env.REACT_APP_API_KEY,
      },
      data: {
        prompt: {
          text: prompt,
        },
      },
    });

    const result = response.data;
    if (result && result.candidates && result.candidates.length > 0) {
      return result.candidates[0].output;
    } else {
      throw new Error('No candidates found');
    }
  } catch (error) {
    console.error('Error generating text:', error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

export default generate;
