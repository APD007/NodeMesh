//Controller Actions
module.exports.index = async function (request, response) {
  return response.status(200).json({
    success: true,
    error: null,
    results: "Server is Up and Running",
  });
};
