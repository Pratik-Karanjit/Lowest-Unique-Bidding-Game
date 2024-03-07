let errorResponse = (res, statusCode, message, result) => {
  res.status(statusCode).json({
    success: false,
    message,
    result,
  });
};

export default errorResponse;
