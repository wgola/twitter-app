export const wrapper = async (request) => {
  try {
    const result = await request();

    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
