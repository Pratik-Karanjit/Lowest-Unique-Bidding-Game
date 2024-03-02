let errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorResponse;
